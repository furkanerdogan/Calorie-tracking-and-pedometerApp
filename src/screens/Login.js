import * as React from "react";
import { useState, useContext } from "react";
import Icon from 'react-native-vector-icons/Ionicons';

import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, Dimensions, TouchableOpacity, ImageBackground } from "react-native"
import { MyTextInput, MyButton, Googlebutton } from "../components/index"
import { AuthContext } from '../Navigation/AuthProvider'
const window = Dimensions.get('window');
function Login({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const { login, googleLogin } = useContext(AuthContext);


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>


            <ImageBackground source={require('../../assets/images/nature1.png')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <Text style={styles.title}>LOGIN</Text>
                    <Text>{error}</Text>
                    <MyTextInput placeholderTextColor="white" placeholder="Email..." style={styles.box1} onChangeText={(email) => setEmail(email)}></MyTextInput>

                    <MyTextInput placeholderTextColor="white" placeholder="Şifre..." style={styles.box1} secureTextEntry={true} onChangeText={(password) => setPassword(password)}></MyTextInput>
                    <TouchableOpacity style={{ alignSelf: "flex-end" }}><Text style={{ paddingRight: 50, paddingTop: 5, color: "white" }}>Şifremi unuttum </Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Register') }} style={{ alignSelf: "flex-end" }}><Text style={{ paddingRight: 50, paddingTop: 5, color: "white" }}>Kayıt Ol </Text></TouchableOpacity>

                    <MyButton onPress={() => { login(email, password) }} title="giriş yap" />
                    <Googlebutton
                        buttonTitle="Sign In with Google"
                        btnType="google"
                        color="#de4d41"
                        backgroundColor="#f5e7ea"
                        onPress={() => { googleLogin() }}
                    />
                </View>

            </ImageBackground>

        </TouchableWithoutFeedback >

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center"

    },
    title: {
        fontWeight: '700',
        top: -47,
        fontSize: 23,
        color: "white"
    },

    backgroundImage: {
        flex: 1,
        resizeMode: "cover",

    },
    Oauth: {
        flex: 2,
        backgroundColor: "red"

    }
})
export default Login;


