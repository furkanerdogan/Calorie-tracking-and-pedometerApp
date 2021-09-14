import React, { useState, useContext } from 'react'
import { View, Text, Button, TouchableHighlight, StyleSheet, TextInput, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker'

import RNDateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { LogBox } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from '../Navigation/AuthProvider'

const window = Dimensions.get('window');
{/*         height: window.height * 0.07, */ }

LogBox.ignoreLogs([
    'DatePickerIOS has been merged with DatePickerAndroid and will be removed in a future release.',
    'StatusBarIOS has been merged with StatusBar and will be removed in a future release.',
    'DatePickerAndroid has been merged with DatePickerIOS and will be removed in a future release.'
]);


export default function Aktivite({ navigation }) {
    const { user } = useContext(AuthContext);

    const [notes, setNotes] = useState("");
    const [calories, setCalories] = useState(0);
    const [period, setPeriod] = useState(0);
    const [adimSayisi, setAdimSayisi] = useState(0);

    const [activityName, setActivityName] = useState("");

    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState("");
    const [startMinute, setStartMinute] = useState("");
    const [endTime, setEndTime] = useState("");
    const [endMinute, setEndMinute] = useState("");
    const [time, setTime] = useState(undefined);
    const [show2, setShow2] = useState(false);

    const [show, setShow] = useState(false);
    const [interval, setMinInterval] = useState(1);
    const [activityType, setActivitType] = useState("");

    let StartValue = startTime + ":" + startMinute;
    let EndValue = endTime + ":" + endMinute;
    const sports = [
        {
            label: 'Yürüyüş',
            value: 'Yürüyüş',
        },
        {
            label: 'Koşma',
            value: 'Koşma',
        },
        {
            label: 'Bisiklet',
            value: 'Bisiklet',
        },
    ];


    const StartTime = (event, selectedDate) => {
        let date = selectedDate || date;
        let saat = date.getHours();
        let dakika = date.getMinutes();
        StartValue = startTime + ":" + startMinute;

        setShow(Platform.OS === 'ios');
        setTime(startTime);
        setStartTime(saat);
        setStartMinute(dakika);

    };

    const EndTime = (event, selectedDate) => {
        let date = selectedDate || time;
        console.log("**************************");
        console.log("dateee", date);
        let saat = date.getHours();
        let dakika = date.getMinutes();


        setShow2(Platform.OS === 'ios');
        setTime(startTime);
        setEndTime(saat);
        setEndMinute(dakika);

    };

    const showTimepicker = () => {
        setShow(true);
    }
    const showTimepicker2 = () => {
        setShow2(true);
    }
    const placeholder = {
        label: 'Aktivite Seçiniz...',
        value: null,
        color: '#9EA0A4',
    };





    const submit = async () => {
        firestore()
            .collection('Activity')
            .add({
                userId: user.uid,
                activityName: activityName,
                activityType: activityType,
                date: date,
                startTime: StartValue,
                endTime: EndValue,
                notes: notes,
                calories: calories,
                adimSayisi: adimSayisi,
                period: period,
            })
            .then(() => {
                console.log('User added!');
            })
            .catch((error) => {
                console.log(error);

            });
        navigation.goBack();

    }

    return (

        <ScrollView style={{ flex: 1 }}>
            <View style={styles.header}>

                <Icon name="md-arrow-back" size={30} onPress={() => navigation.goBack()} />
                <Icon name="md-checkmark-circle" onPress={() => submit()} size={30} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.h2}>Aktivite Ekleyin</Text>
                <View style={styles.sectionForm}>
                    <TextInput placeholderTextColor="black" placeholder="Aktivite Adı" onChangeText={(text) => setActivityName(text)} backgroundColor="white" style={{ width: window.width * 0.9, color: "black", borderRadius: 10, height: 50, marginBottom: 25, marginTop: 20 }} />
                    <RNPickerSelect
                        placeholder={placeholder}
                        items={sports}
                        onValueChange={value => {
                            setActivitType(value);
                        }}
                        style={{
                            ...styles,
                            iconContainer: {
                                top: 10,
                                right: 12,
                            },
                        }}
                        value={activityType}
                        useNativeAndroidPickerStyle={false}
                        textInputProps={{ underlineColor: 'yellow' }}
                        Icon={() => {
                            return <Icon size={24} name="md-arrow-down" color="gray" />;
                        }}
                    />

                    <DatePicker
                        style={{ width: window.width * 0.9, borderRadius: 10, marginBottom: 25 }}
                        date={date}
                        mode="date"
                        locale={'tr'}
                        placeholder="Tarih Seçiniz"
                        format="YYYY-MM-DD"
                        minDate="2021-01-31"
                        maxDate="2021-12-30"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,

                            },
                            dateInput: {
                                marginLeft: 36,
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => { setDate(date) }}
                    />
                    <View style={styles.row}>
                        <TextInput placeholderTextColor="gray" value={StartValue == ':' ? "" : StartValue} placeholder="Başlama Saati" onPressIn={() => { showTimepicker(true) }} fontSize={11} backgroundColor="white" style={{ width: window.width * 0.4, borderRadius: 10, height: 50, marginBottom: 25, color: "black", marginRight: 30 }} />
                        <TextInput placeholderTextColor="gray" value={EndValue == ':' ? "" : EndValue} placeholder="Bitiş Saati" onPressIn={() => { showTimepicker2(true) }} fontSize={11} backgroundColor="white" style={{ width: window.width * 0.4, borderRadius: 10, height: 50, marginBottom: 25, color: "black" }} />
                    </View>


                    {show2 && (
                        <RNDateTimePicker
                            testID="dateTimePicker"
                            value={new Date()}
                            mode='time'
                            is24Hour={true}
                            display="default"
                            onChange={EndTime}
                        />
                    )}
                    {show && (

                        <RNDateTimePicker
                            testID="dateTimePicker"
                            value={new Date()}
                            mode='time'
                            is24Hour={true}
                            display="default"
                            onChange={StartTime}
                        />

                    )}

                    <TextInput placeholderTextColor="gray" onChangeText={(text) => setNotes(text)} placeholder="Notlar" fontSize={11} multiline={true} backgroundColor="white" style={{ width: window.width * 0.9, borderRadius: 10, height: 90, marginBottom: 25, color: "black" }} />

                    <TextInput placeholderTextColor="gray" keyboardType="numeric" onChangeText={(text) => setCalories(text)} placeholder="Kalori" fontSize={11} backgroundColor="white" style={{ width: window.width * 0.9, borderRadius: 10, height: 50, marginBottom: 25, color: "black" }} />

                    <TextInput placeholderTextColor="gray" onChangeText={(text) => setAdimSayisi(text)} placeholder="Süre" fontSize={11} backgroundColor="white" style={{ width: window.width * 0.9, borderRadius: 10, height: 50, marginBottom: 25, color: "black" }} />
                    {activityType === "Yürüyüş" ? <TextInput placeholderTextColor="gray" onChangeText={(text) => setPeriod(text)} placeholder="Adım Sayısı" fontSize={11} backgroundColor="white" style={{ width: window.width * 0.9, borderRadius: 10, height: 50, marginBottom: 25, color: "black" }} /> : <Text></Text>
                    }


                </View>

            </View>



        </ScrollView>

    );
}
const styles = StyleSheet.create({
    h2: {
        fontSize: 25,
        padding: 10,
        fontWeight: '600',
    },
    sectionForm: {
        padding: 10,
        alignItems: "center"
    },
    row: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    inputAndroid: {
        marginBottom: 25,
        backgroundColor: "white",
        width: window.width * 0.9,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10

    },
    baslangic: {
        color: "red",
        justifyContent: "flex-end",
        alignContent: "flex-end",
    }
});