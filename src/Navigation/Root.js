import * as React from 'react';
import { useState, useEffect, useContext } from 'react';

import { View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';//bunu onborading'in bir kere ekrana gelmesi için yüklendimi değişkeni için kullanacağız
import auth from "@react-native-firebase/auth"



import { AuthContext } from "./AuthProvider"
import { AppStack, ModelStack } from './AppStack'
import AuthStack from './Auth'
import OnboardingS from '../screens/OnboardingS'
import Splash from '../screens/Splash'
const RootStack = createStackNavigator();


const ModalStack = createStackNavigator();

const DenemeModal = ({ navigation }) => {
    const { user, setUser } = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);

    const [isLoading, setIsloading] = useState(true);
    const [isFirstLaunch, setIsFirstLaunch] = useState(false);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        setTimeout(() => {
            setIsloading(false);
        }, 1000);
        return subscriber; // unsubscribe on unmount


    }, []);




    if (initializing) return null;

    return (
        <ModalStack.Navigator headerMode="none">

            { isLoading ? (
                <ModalStack.Screen name="Splash" component={Splash} />
            ) : isFirstLaunch ? (<ModalStack.Screen name="OnboardingS" component={OnboardingS} />
            ) : user ? (<ModalStack.Screen name="AppStack" component={AppStack} />
            ) : (<ModalStack.Screen name="AuthStack" component={AuthStack} />
            )}
            <ModalStack.Screen name="ModelStack" component={ModelStack} />

        </ModalStack.Navigator>
    )
};


export default () => {
    // useEffect(function updateTitle() {
    //     AsyncStorage.getItem('alreadryLaunched').then(value => {
    //         if (value == null) {
    //             AsyncStorage.setItem('alreadryLaunched', true);
    //             setIsFirstLaunch(true);
    //         } else {
    //             setIsFirstLaunch(false);
    //         }
    //     });
    // }, []);

    return (
        <NavigationContainer>
            <DenemeModal />
        </NavigationContainer>
    )
}