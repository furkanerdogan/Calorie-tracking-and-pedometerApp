import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import GoogleFit, { Scopes } from 'react-native-google-fit';


const options = {
    unit: "kg",
    startDate: "2017-01-01T00:00:17.971Z", // required ISO8601Timestamp
    endDate: new Date().toISOString(),// required ISO8601Timestamp
    basalCalculation: true,
    ascending: false,
    bucketUnit: "DAY",
    bucketInterval: 1,
};



export default function StepCounter() {
    const [Steps, setSteps] = useState(null);
    //   GoogleFit.checkIsAuthorized().then(() => {
    //     console.log(GoogleFit.isAuthorized) // Then you can simply refer to `GoogleFit.isAuthorized` boolean.
    // })
    useEffect(() => {
        GoogleFit.checkIsAuthorized().then(() => {

            if (!GoogleFit.isAuthorized) {
                const options = {
                    scopes: [
                        Scopes.FITNESS_ACTIVITY_READ,
                        Scopes.FITNESS_ACTIVITY_WRITE,
                    ],
                }

                console.log("Attempting to authorize");

                GoogleFit.authorize(options)
                    .then(authResult => {
                        if (authResult.success) {
                            console.log('Success')
                            dispatch("AUTH_SUCCESS");
                        } else {
                            console.log('Denied')
                            dispatch("AUTH_DENIED", authResult.message);
                        }
                    })
                    .catch(() => {
                        dispatch("AUTH_ERROR");
                    })

            } else {

                console.log("Already authorized")
            }
        })
    }, [])

    const basla = () => {
        GoogleFit.startRecording((step) => {

            GoogleFit.getDailySteps(options)
                .then((res) => {
                    console.log('Daily steps x>>> ', res)
                })
                .catch((err) => { console.warn(err) })

        });

    }




    return (
        <View>
            <TouchableOpacity onPress={basla}><Text>başla</Text></TouchableOpacity>
        </View>
    )
}
