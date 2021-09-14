import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { exp } from 'react-native-reanimated';


import Home from '../screens/Home'
import Account from '../screens/Account'
import { Gunluk } from '../screens/Gunluk'
import GoruntuIsleme from '../screens/GoruntuIsleme'
import Aktivite from "../screens/Aktivite"
import AddWater from "../screens/AddWater"
import StepCounter from "../screens/StepCounter"
import Yemek from "../screens/Yemek"
import NutrationDetails from "../screens/NutrationDetails"

const StackModal = createStackNavigator();
const ModelStack = () =>
(
    <StackModal.Navigator mode="modal"  >
        <StackModal.Screen options={{ headerShown: false, tabBarVisible: false }} name="Aktivite" component={Aktivite} />
        <StackModal.Screen options={{ headerShown: false, tabBarVisible: false }} name="AddWater" component={AddWater} />
        <StackModal.Screen options={{ headerShown: false, tabBarVisible: false }} name="StepCounter" component={StepCounter} />
        <StackModal.Screen options={{ headerShown: false, tabBarVisible: false }} name="Yemek" component={Yemek} />
        <StackModal.Screen options={{ headerShown: false, tabBarVisible: false }} name="NutrationDetails" component={NutrationDetails} />


    </StackModal.Navigator>
);



const Tab = createMaterialBottomTabNavigator();
const AppStack = () => {
    return (
        <Tab.Navigator
            mode="modal"
            headerMode="none"
            initialRouteName="Gunluk"
            activeColor='#f0edf6'
            inactiveColor='#a7a9ac'
            shifting={true}
        >
            {/* tabBarColor: '#ea9b5e'*/}
            <Tab.Screen
                name="Like"
                component={Home}
                options={{
                    tabBarLabel: 'Yemek',
                    tabBarColor: '#de2154',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name="Gunluk"
                component={Gunluk}
                options={{
                    tabBarColor: '#70b5db',

                    tabBarLabel: 'Günlük',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="book" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="GoruntuIsleme"
                component={GoruntuIsleme}
                options={{
                    tabBarColor: '#905936',

                    tabBarLabel: 'GoruntuIsleme',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="fruit-pineapple" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarColor: '#86ac55',

                    tabBarLabel: 'Profil',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export { AppStack, ModelStack };