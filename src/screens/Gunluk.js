import React, { useEffect, useState, } from 'react'
import { View, Text, StyleSheet, FlatList, Dimensions, ScrollView } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Svg, { Circle } from "react-native-svg";
import { ProgressCircle } from 'react-native-svg-charts'
import firestore from '@react-native-firebase/firestore';
import moment from "moment"
import { FitImage, FitExerciseStat, FitHealthStat, FitChart, AdditionalStats } from "../components/index"
import GoogleFit, { Scopes } from 'react-native-google-fit';


const { width } = Dimensions.get("screen");
const stepsData = {
    labels: ["Pzt", "Salı", "Çrş", "Prş", "Cuma", "Cmrt", "Pzr"],
    datasets: [
        {
            data: [200, 100, 500, 50, 800, 300, 700, 1500],
            baseline: 1000
        }
    ]
};


function Gunluk({ navigation }) {
    let totalCalories;
    let totalPeriod;
    let totalAdimSayisi;
    const [activitydata, setActivityData] = useState(null);

    const options = {
        scopes: [
            Scopes.FITNESS_ACTIVITY_READ,
            Scopes.FITNESS_ACTIVITY_WRITE,

        ],
    };


    GoogleFit.authorize({ scopes: [Scopes.FITNESS_ACTIVITY_WRITE, Scopes.FITNESS_ACTIVITY_READ], });
    GoogleFit.authorize(options)
        .then((authResult) => {
            if (authResult.success) {
                console.log('AUTH_SUCCESS*******************');
            } else {
                console.log('AUTH_DENIED', authResult.message);
            }
        })
        .catch(() => {
            console.log('AUTH_ERROR');
        });

    useEffect(async () => {
        const fetchData = async () => {
            try {
                const list = [];
                await firestore()
                    .collection('Activity')
                    .get()
                    .then(querySnapshot => {

                        querySnapshot.forEach(doc => {
                            const { userId, activityName, activityType, adimSayisi, calories, startTime, endTime, notes, period, date, } = doc.data();
                            list.push({
                                id: doc.id,
                                userId,
                                activityName: activityName,
                                activityType,
                                adimSayisi: adimSayisi,
                                date: moment(date).format("DD-MM-YYYY"),
                                startTime: startTime,
                                endTime: endTime,
                                notes: notes,
                                period: period,
                                calories: calories
                            });
                        })
                    })
                setActivityData(list);

            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
        setInterval(fetchData, 4000);
    }, []);


    if (activitydata !== null) {
        totalCalories = activitydata.reduce((total, item) => (total += JSON.parse(item.calories)), 0);
        totalPeriod = activitydata.reduce((total, item) => (total += JSON.parse(item.period)), 0);
        totalAdimSayisi = activitydata.reduce((total, item) => (total += JSON.parse(item.adimSayisi)), 0);
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>

                <FitImage />
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        marginLeft: width * 0.15,
                        marginRight: width * 0.15,
                        marginBottom: width * 0.05,
                    }}>

                    <FitHealthStat
                        iconBackgroundColor="#183b57"
                        iconColor="#0e8df2"
                        actual={totalPeriod}
                        over="/100"
                        type="Süre"
                    />
                    <FitHealthStat
                        iconBackgroundColor="#02ac8a"
                        iconColor="#0e8df2"
                        actual={totalCalories}
                        over="/100"
                        type="Kalori"
                        doubleIcon
                    />

                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        marginLeft: width * 0.1,
                        marginRight: width * 0.1,
                        marginBottom: width * 0.05,
                    }}
                >
                    <View>
                        <FitExerciseStat quantity={totalAdimSayisi} type="steps" />
                    </View>
                    <View>
                        <Text style={{ color: "#9a9ba1", fontSize: 40, fontWeight: "100" }}>
                            |
                        </Text>
                    </View>
                    <View>
                        <FitExerciseStat quantity={totalCalories} type="cal" />
                    </View>
                    <View>
                        <Text style={{ color: "#9a9ba1", fontSize: 40, fontWeight: "100" }}>
                            |
                        </Text>
                    </View>
                    <View>
                        <FitExerciseStat quantity="5.2" type="km" />
                    </View>
                </View>

                <FitChart
                    title={"Haydi, sağlık için günlük 10.000 bin adım atalım"}
                    data={stepsData}
                    baseline={10000}
                />
                <FlatList
                    data={activitydata}
                    renderItem={({ item }) =>
                        <View style={styles.cardActivity}>
                            <View style={styles.row}>
                                <Icon name="md-walk" />
                                <Text>{item.startTime}</Text>
                            </View>
                            <Text>{item.activityName}</Text>
                            <View style={styles.row}>
                                <Text style={styles.txt}>{item.activityType}</Text>
                                <Text>{item.calories} kalori</Text>
                            </View>
                            <Text>{item.date}</Text>
                        </View>}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />



            </ScrollView>
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                {/* Rest of the app comes ABOVE the action button component !*/}
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="Aktivite" onPress={() => { navigation.navigate('ModelStack', { screen: "Aktivite" }) }} >
                        <Icon name="book" style={styles.actionButtonIcon} />
                    </ActionButton.Item>

                    <ActionButton.Item buttonColor='#1abc9c' title="Yürüyüş Takip" onPress={() => { navigation.navigate('ModelStack', { screen: "StepCounter" }) }}>
                        <Icon name="walk-outline" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="Su Ekle" onPress={() => { navigation.navigate('ModelStack', { screen: "AddWater" }) }}>
                        <Icon name="md-water" style={styles.actionButtonIcon} />
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
export { Gunluk };