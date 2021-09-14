import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

export default function NutrationDetails({ route, navigation }) {
    const { item } = route.params;
    const [YemekAdi, setYemekAdi] = useState(item.YemekAdi);
    const [Kalori, setKalori] = useState(item.Kalori);
    const [Protein, setProtein] = useState(item.Protein);
    const [Karbonhidrat, setKarbonhidrat] = useState(item.Karbonhidrat);
    const [Porsiyon, setPorsiyon] = useState(item.Porsiyon);



    return (
        <View style={{
            flex: 1,
            backgroundColor: "#1f2026",
        }}>
            <View style={styles.header}>

                <Icon name="md-arrow-back" size={30} onPress={() => navigation.goBack()} color={"white"} />
            </View>
            <View style={{ backgroundColor: "red", justifyContent: "space-around", flexDirection: "row", margin: 20 }}>
                <Text style={{ fontSize: 22, color: "white" }}>YemekAdi:</Text>
                <Text style={{ fontSize: 22, color: "white" }}>{YemekAdi}</Text>
            </View>
            <View style={{ backgroundColor: "red", justifyContent: "space-around", flexDirection: "row", margin: 20 }}>
                <Text style={{ fontSize: 22, color: "white" }}>Kalori:</Text>
                <Text style={{ fontSize: 22, color: "white" }}>{Kalori}</Text>
            </View>
            <View style={{ backgroundColor: "red", justifyContent: "space-around", flexDirection: "row", margin: 20 }}>
                <Text style={{ fontSize: 22, color: "white" }}>Protein:</Text>
                <Text style={{ fontSize: 22, color: "white" }}>{Protein}</Text>
            </View>
            <View style={{ backgroundColor: "red", justifyContent: "space-around", flexDirection: "row", margin: 20 }}>
                <Text style={{ fontSize: 22, color: "white" }}>Karbonhidrat:</Text>
                <Text style={{ fontSize: 22, color: "white" }}>{Karbonhidrat}</Text>
            </View>

            <View style={{ backgroundColor: "red", justifyContent: "space-around", flexDirection: "row", margin: 20 }}>
                <Text style={{ fontSize: 22, color: "white" }}>Porsiyon:</Text>
                <Text style={{ fontSize: 22, color: "white" }}>{Porsiyon}</Text>
            </View>



        </View>
    )
}
const styles = StyleSheet.create({

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10

    },

});