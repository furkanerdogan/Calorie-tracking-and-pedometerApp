import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import GoogleFit, { Scopes } from 'react-native-google-fit';
import Icon from 'react-native-vector-icons/Ionicons';

export default function StepCounter() {
    const [stop, setStop] = useState(false);

    const [recording, setRecording] = useState(false);
    // const [adim, setAdim] = useState([]);
    // let temp = 0;

    const [steps, setSteps] = useState([]);
    const options = {
        scopes: [
            Scopes.FITNESS_ACTIVITY_READ,
            Scopes.FITNESS_ACTIVITY_WRITE,

        ],
    };

    const opt = {
        startDate: new Date(2021, 1, 1).toISOString(), // required ISO8601Timestamp
        endDate: new Date().toISOString(), // required ISO8601Timestamp
        bucketUnit: 'DAY', // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
        bucketInterval: 1, // optional - default 1.
    };

    const fetchMyAPI = async () => {
        var dataDisplay = null;

        await GoogleFit.checkIsAuthorized().then(async () => {
            if (GoogleFit.isAuthorized === true) {
                await GoogleFit.getDailySteps(opt)
                    .then((res) => {
                        console.log('Daily steps >>> ', res)
                        if (res[2].steps !== null) {


                            setSteps(res[2].steps);
                        }

                        console.log('çalışıyor mu')

                    })
                    .catch((err) => { console.warn(err) })
            }
        });



    }

    useEffect(() => {

        if (!stop || !recording) {
            let isMounted = true;
            fetchMyAPI();
            return () => {
                isMounted = false;
            };
        }

    }, [steps])

    const basla = () => {

        if (!recording) {
            GoogleFit.startRecording((step) => {
                setRecording(true)
                console.log("step")
                console.log("step", step)
                const options = {
                    unit: "kg",
                    startDate: new Date().toISOString(), // required ISO8601Timestamp
                    endDate: new Date().toISOString(),// required ISO8601Timestamp
                    basalCalculation: true,
                    ascending: false,
                    bucketUnit: "DAY",
                    bucketInterval: 1,
                };
            });
        }
        else {
            console.log("zaten çalışıyro");
        }

    }


    const dur = () => {
        setStop(true);
    }
    console.log("my1", steps);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#1f2026",
                paddingTop: 5,
                justifyContent: "center",
                alignItems: "center",
            }}>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 40 }}>
                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", height: 50, width: 50, backgroundColor: "white", marginRight: 40 }} onPress={basla}><Icon name="md-play" size={30} />
                </TouchableOpacity>
                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", height: 50, width: 50, backgroundColor: "white" }} onPress={dur}><Icon name="md-close-circle" size={30} /></TouchableOpacity>

            </View>

            {steps.map(x => {
                return (
                    <View style={{ justifyContent: "center", alignItems: "center", height: 100, width: 100, borderRadius: 50, backgroundColor: "white" }}><Text>{x.value} Adım</Text></View>
                )
            })}


        </View>
    )


}


