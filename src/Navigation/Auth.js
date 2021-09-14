import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import OnboardingPage from '../screens/OnboardingS'
import Login from '../screens/Login'
import Register from '../screens/Register'

const StackAuth = createStackNavigator();

const AuthStack = () => {

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '430468531204-djet156fic2s8bktsn7joan4qduu8c0v.apps.googleusercontent.com',

        });
    }, []);
    const [isFirstLaunch, setIsFirstLaunch] = useState(true);
    let routeName;

    if (isFirstLaunch === null) {
        return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
    } else if (isFirstLaunch == true) {
        routeName = 'OnboardingPage';
    } else {
        routeName = 'Login';
    }
    return (
        <StackAuth.Navigator headerMode='none' initialRouteName={routeName}>
            <StackAuth.Screen name="OnboardingPage" component={OnboardingPage} />
            <StackAuth.Screen name="Login" component={Login} />
            <StackAuth.Screen name="Register" component={Register} />
        </StackAuth.Navigator>
    );
}

export default AuthStack;
