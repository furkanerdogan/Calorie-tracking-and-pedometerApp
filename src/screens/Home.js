import React, { useContext, useEffect, useState } from 'react'
import ActionButton from 'react-native-action-button';

import { View, Button, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { ProgressCircle } from 'react-native-svg-charts'
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import { FitImage, FitExerciseStat, FitHealthStat, FitChart, AdditionalStats } from "../components/index"
import { YemekContext } from '../store/Yemekprovider'

export default function Home(props) {
    const navigation = props.navigation;
    const [yemekler, setYemekler] = useState(null);
    const { product } = useContext(YemekContext);
    const totalCalories = product.reduce((total, item) => (total += JSON.parse(item.Kalori)), 0);
    const progress = 0.0003 * totalCalories;
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const list = [];
    //             await firestore()
    //                 .collection('Yemek')
    //                 .get()
    //                 .then(querySnapshot => {
    //                     querySnapshot.forEach(doc => {
    //                         const { Kalori, YemekAdi, userId } = doc.data();
    //                         list.push({

    //                             userId,
    //                             Kalori: Kalori,
    //                             YemekAdi: YemekAdi,
    //                         });
    //                     })
    //                 })
    //             setYemekler(list);

    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }
    //     fetchData();
    //     setInterval(fetchData, 4000);

    // }, []);
    return (
        <View style={{ flex: 1 }}>

            {/* Rest of the app comes ABOVE the action button component !*/}




            <ProgressCircle style={{ height: 200, marginTop: 10 }} progress={progress} progressColor={'rgb(134, 65, 244)'} >
                <Text style={{ textAlign: "center", top: 90, fontSize: 20 }}>{totalCalories} cal</Text>
            </ProgressCircle>

            <FlatList
                data={product}
                renderItem={({ item }) =>

                    <TouchableOpacity style={styles.cardActivity}
                        onPress={() => {
                            navigation.navigate('ModelStack', {
                                screen: 'NutrationDetails',
                                params: { item: item },
                            })
                        }}>
                        <Text>{item.YemekAdi}</Text>
                        <Text>{item.Kalori} kalori</Text>
                    </TouchableOpacity>
                }
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />



            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                {/* Rest of the app comes ABOVE the action button component !*/}

                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="Yemek" onPress={() => { navigation.navigate('ModelStack', { screen: "Yemek" }) }} >
                        <Icon name="fast-food" style={styles.actionButtonIcon} />
                    </ActionButton.Item>

                </ActionButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1f2026",

    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    row: {
        flexDirection: "row",

    },
    cardActivity: {
        margin: 10,
        borderRadius: 5,
        padding: 10,
        height: 90,
        backgroundColor: "#9a9ba1"
    },
    txt: {
        marginRight: 10
    }

});