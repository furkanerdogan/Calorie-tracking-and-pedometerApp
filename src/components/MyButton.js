import * as React from "react"
import { Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"

const window = Dimensions.get('window');
function MyButton({ title, styletext, styletouch, ...Children }) {
    return (<TouchableOpacity {...Children} style={[styletouch, styles.buton]}><Text style={[styletext, styles.btnyazi]}>{title}</Text></TouchableOpacity>);
}

const styles = StyleSheet.create({
    buton: {
        height: window.height * 0.06,
        width: window.width * 0.4,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,

    },
    btnyazi: {


        elevation: 10,
        color: 'black',
        fontSize: 20
    },

})
export { MyButton };