import React, { useState, useContext } from 'react'
import { View, Text, TextInput, TouchableHighlight, StyleSheet, Dimensions, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import { AuthContext } from '../Navigation/AuthProvider'
import {
    Avatar,
    Title,
    Caption,
    TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const window = Dimensions.get('window');

function Account({ navigation }) {
    const { logout, user } = useContext(AuthContext);
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>

                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>{user.displayName}</Title>
                        <Caption style={styles.caption}>@frkn</Caption>
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="map-marker-radius" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>Turkey, İstanbul</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="phone" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>+905066882229</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="email" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{user.email}</Text>
                </View>
            </View>
            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, {
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1
                }]}>
                    <Title>70kg</Title>
                    <Caption>Kilo</Caption>
                </View>
                <View style={styles.infoBox}>
                    <Title>1.83cm</Title>
                    <Caption>Boy</Caption>
                </View>

            </View>
            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, {
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1
                }]}>
                    <Title>Erkek</Title>
                    <Caption>Cinsiyet</Caption>
                </View>


            </View>

            <View style={styles.menuWrapper}>


                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="account-check-outline" color="#FF6347" size={25} />
                        <Text style={styles.menuItemText}>Yardım</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="settings-outline" color="#FF6347" size={25} />
                        <Text style={styles.menuItemText}>Ayarlar</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => logout()}>
                    <View style={styles.menuItem}>
                        <Icon name="exit-to-app" color="#FF6347" size={25} />
                        <Text style={styles.menuItemText}>Çıkış Yap</Text>
                    </View>
                </TouchableRipple>
            </View>
        </SafeAreaView>
    );
};

export default Account;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },

    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});