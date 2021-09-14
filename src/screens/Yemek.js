
import React, { useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';

import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    FlatList,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { YemekContext } from '../store/Yemekprovider'
import { TouchableHighlight } from 'react-native';

function Yemek({ navigation }) {
    const { addNutration } = useContext(YemekContext);

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const list = [];
                await firestore()
                    .collection('Yemek')
                    .get()
                    .then(querySnapshot => {

                        querySnapshot.forEach(doc => {
                            const { YemekAdi, Kalori, Porsiyon, Protein, Karbonhidrat } = doc.data();
                            list.push({

                                YemekAdi: YemekAdi,
                                Kalori: Kalori,
                                Porsiyon: Porsiyon,
                                Protein: Protein,
                                Karbonhidrat: Karbonhidrat,

                            });
                        })
                    })
                setFilteredDataSource(list)
                setMasterDataSource(list)

            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);


    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterDataSource.filter(
                function (item) {
                    const itemData = item.YemekAdi
                        ? item.YemekAdi.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setFilteredDataSource(newData);
            setSearch(text);

        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    const ItemView = ({ item }) => {

        return (
            // Flat List Item

            <View style={{
                alignItems: "center", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 5
            }}>
                <Text
                    style={styles.itemStyle}
                    onPress={() => navigation.navigate('AppStack', { screen: "Home" }, { params: { item: item } })}>
                    {/* onPress={() => navigation.navigate('AppStack', { screen: "Home" }, { params: { item: item } })}> */}

                    {item.YemekAdi.toUpperCase()} <Text style={{ fontWeight: "bold", fontSize: 11, fontStyle: "italic" }}>{item.Porsiyon}</Text>
                </Text>
                <TouchableOpacity style={{
                    backgroundColor: "green", padding: 10, alignContent: "space-between"
                }} onPress={() => addNutration(item)}><Text>Ekle</Text></TouchableOpacity>
            </View>

        );
    };

    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={search}
                    underlineColorAndroid="transparent"
                    placeholder="Tavuk, hamburger, iskender"
                />
                <FlatList
                    data={filteredDataSource}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                />
            </View>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    itemStyle: {
        alignContent: "space-between"

    },
    textInputStyle: {
        backgroundColor: "gray",
        color: "white",
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
    },
});

export default Yemek;