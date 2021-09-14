import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import Resim from "../assets/water-drop.png"

export default function AddWater({ navigation }) {
    const [num, setNum] = useState(1);
    const [val, setVal] = useState(0.2);

    let data = [{
        cups: num,
        value: val,
    }];

    const arttır = () => {
        let cups = num;
        let value = val;
        value = value + 0.2;
        cups = cups + 1;
        setNum(cups);
        setVal(Math.floor(value * 10) / 10);// 0.2+0.2 bazen 0.39 oluyrodu ondan dolayı yuvarlayarak işlem yapıyorum.
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                padding: 10,
                backgroundColor: "gray"
            }}>
                <Icon name="md-arrow-back" size={25} onPress={() => navigation.goBack()} />
            </View>
            <View style={{ margin: 30, backgroundColor: "lightgray", borderRadius: 15 }}>
                {data.map((x) => {
                    var payments = [];
                    console.log("asdasd", x.value);

                    for (let i = 0; i < num; i++) {

                        payments.push(
                            <View key={i}>
                                <Image style={{
                                    height: 50, width: 50
                                }} source={Resim} />
                            </View>


                        )
                    }
                    return (
                        <View style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                        }}>
                            { payments}
                            <Text>{data[0].value}L</Text>

                        </View>
                    )
                })}


            </View>
            <TouchableOpacity onPress={() => arttır()} style={{ bottom: -200, alignItems: "center", marginBottom: 15 }}><Text style={{ padding: 10, backgroundColor: "lightblue", borderRadius: 15 }}>Ekle</Text></TouchableOpacity>
            <View style={{ bottom: -200, backgroundColor: "lightblue", padding: 30, justifyContent: "center", alignItems: "center" }}>
                <Text>Her bi su damlası 0.2mL(bir su bardağı su) kadardır.</Text></View>

        </View>
    )
}
