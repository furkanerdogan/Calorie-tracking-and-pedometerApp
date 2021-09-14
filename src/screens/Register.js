import * as React from "react";
import { Component, useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, Dimensions, TouchableOpacity, Image, Alert, TextInput, ImageBackground } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../Navigation/AuthProvider'

import { MyTextInput, MyButton } from '../components/index'



const window = Dimensions.get('window');

function Register({ navigation }) {
    const { register } = useContext(AuthContext);

    const [Sifre, setSifre] = useState("");
    const [Mail, setMail] = useState("");
    const [MailError, setMailError] = useState("");
    const [SifreError, setSifreError] = useState("");
    const [Bool, setBool] = useState(false);

    const kontrol = () => {
        if (Bool == false) {
            let reg = (/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (Sifre == "" && Mail == "" || Mail == "") {
                setMailError("*Lütfen geçerli bir e-posta girin");
                setBool(false);
            }
            else if (Mail != "" && reg.test(Mail) === false) {
                setBool(false);
            }
            else if (Mail != "" && Sifre == "") {
                setMailError("");
                setSifreError("*Şifre boş olmaz ");
                setBool(false);
            }
            else if (Mail != "" && Sifre.length <= 6) {
                setMailError("");
                setSifreError("*Şifre 6dan küçük  olmaz ");
                setBool(false);
            }
            else
                setBool(true);
        }
        else {
            register(Mail, Sifre);
            Alert.alert(
                "Üye işlemi başarıyla tamamlandı",
                "",
                [
                    { text: "Tamam", onPress: () => navigation.navigate('Login') }
                ],
                { cancelable: false }
            );
            setSifre("");
            setMailError("");
            setSifreError("");
            setMail("");
        }
    }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

            <ImageBackground source={require('../../assets/images/nature1.png')} style={styles.backgroundImage}>
                <Icon name="md-arrow-back" size={25} style={{ margin: 10 }} onPress={() => navigation.goBack()} />

                <View style={styles.container}>

                    <Text style={styles.baslik}>Kayıt Ol</Text>
                    <MyTextInput placeholder="Mail" style={styles.box1} value={Mail} onChangeText={(text) => setMail(text)} keyboardType="email-address" />
                    <Text>{MailError}</Text>
                    <MyTextInput placeholder="Şifre" style={styles.box1} value={Sifre} onChangeText={(text) => setSifre(text)} secureTextEntry={true} />
                    <Text>{SifreError}</Text>
                    <MyButton title="Kayıt ol" onPress={() => { kontrol() }} />


                </View>
            </ImageBackground>

        </TouchableWithoutFeedback >

    );
}

const styles = StyleSheet.create({
    baslik: {
        color: "white",
        fontSize: 30,
        alignItems: 'center',
        marginTop: window.height * 0.1,
        marginBottom: window.height * 0.1,
    },
    container: {
        justifyContent: "center",
        alignItems: "center"


    },
    deneme: {
        backgroundColor: "red",
    },
    box1: {
        marginTop: 10,
        fontFamily: "Arial",

    },
    hata: {
        borderWidth: 1,
        borderColor: "red",
        marginTop: 10,
        fontFamily: "Arial",


    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    }
});

export default Register;


