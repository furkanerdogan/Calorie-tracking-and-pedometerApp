import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';

function OnboardingS() {
    const navigation = useNavigation();

    return (
        <Onboarding
            onSkip={() => navigation.reset({
                index: 0,
                routes: [
                    {
                        name: 'Login'

                    },
                ],
            })}
            onDone={() => navigation.reset({
                index: 0,
                routes: [
                    {
                        name: 'Login'

                    },
                ],
            })}
            pages={[

                {
                    backgroundColor: '#e62a34',
                    title: '',
                    subtitle: '',
                    image: <Image source={require('../../assets/images/onpagin1.png')} style={{ height: 400, width: 400 }} />,


                },
                {

                    backgroundColor: '#c45959',
                    title: '',
                    subtitle: 'StayHealty Uygulamasına Hoş Geldiniz.',
                    controlStatusBar: false,
                    image: <Image source={require('../../assets/images/onpagin1.png')} style={{ height: 400, width: 400 }} />,


                },
                {

                    backgroundColor: '#0c5572',
                    title: 'Onboarding 3',
                    subtitle: 'Açıklama 2',
                    image: <Image source={require('../../assets/images/onpagin1.png')} style={{ resizeMode: "center" }} />,


                },
            ]}
            skipLabel="Atla"
            nextLabel="İleri"
            controlStatusBar={false}


        />
    );
};

export default OnboardingS;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
})