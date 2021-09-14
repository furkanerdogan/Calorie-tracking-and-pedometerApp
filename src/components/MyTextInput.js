import React from 'react';
import { Text, View, TextInput, StyleSheet, Dimensions } from 'react-native';


const window = Dimensions.get('window');

function MyTextInput({ style, ...Children }) {

    return (
        //parametrelerden place holder için yazı alıyorum,style için css alıyorum ve 
        //son olarak input içindeki diğer özelliklere ulaşabilmek için ...children tanımlıyorum(Bu şekilde doğru kullanım elde)
        <TextInput {...Children} style={[style, styles.textInputbox]}></TextInput >
    )
}
export { MyTextInput };


const styles = StyleSheet.create({

    textInputbox: {
        marginTop: 10,
        width: window.width * 0.9,
        backgroundColor: 'transparent',
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 25,
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.01,
        shadowRadius: 125,
        elevation: 1,
        color: "white"

    }


})

