import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native'
import { color } from 'react-native-reanimated';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Tflite from 'tflite-react-native';

let tflite = new Tflite();
var modelFile = 'models/model.tflite';
var labelsFile = 'models/labels.txt';




export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognitions: null,
            source: null,
        };
        tflite.loadModel({ model: modelFile, labels: labelsFile }, (err, res) => {
            if (err) console.log("deneme", err);
            else console.log(res);
        });
    }




    selectGalleryImage() {
        const options = {};
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User Cancelled Image Picker');
            } else if (response.error) {
                console.log('Image Picker Error');
            } else if (response.customButton) {
                console.log('User pressed Custom Button');
            } else {
                console.log('uri', response.assets[0].uri);
                this.setState({
                    source: { uri: response.assets[0].uri },
                });
                console.log('this.props.source', this.state.source);

                tflite.runModelOnImage(
                    {
                        path: response.assets[0].uri,
                        imageMean: 128,
                        imageStd: 128,
                        numResults: 5,
                        threshold: 0.05,
                    },
                    (err, res) => {
                        if (err) console.log(err);
                        else {
                            console.log(res[res.length - 1]);
                            this.setState({ recognitions: res[res.length - 1] });
                        }
                    },
                );
            }
        });
    }


    takePhoto() {
        const options = {};
        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User Cancelled Image Picker');
            } else if (response.error) {
                console.log('Image Picker Error');
            } else if (response.customButton) {
                console.log('User pressed Custom Button');
            } else {
                // console.log('Successfully opened library');
                this.setState({
                    source: { uri: response.assets[0].uri },
                });
                tflite.runModelOnImage(
                    {
                        path: response.assets[0].uri,
                        imageMean: 128,
                        imageStd: 128,
                        numResults: 5,
                        threshold: 0.05,
                    },
                    (err, res) => {
                        if (err) console.log(err);
                        else {
                            console.log(res[res.length - 1]);
                            this.setState({ recognitions: res[res.length - 1] });
                        }
                    },
                );
            }
        });
    }

    render() {
        const { recognitions, source } = this.state;

        return (
            <View style={styles.linearGradient}
                colors={['#a8e063', '#56ab2f']}
                style={styles.linearGradient}>
                <View style={styles.titleContainer}>
                    <Text style={styles.subtitle}>Python Neural Network</Text>
                </View>
                <View style={styles.imageContainer}>
                    {recognitions ? (
                        <View>
                            <Image source={source} style={styles.fruitImage} />
                            <Text
                                style={{
                                    color: 'white',
                                    textAlign: 'center',
                                    paddingTop: 10,
                                    backgroundColor: "black",
                                    fontSize: 25,
                                }}>
                                {recognitions['label']}
                            </Text>
                        </View>
                    ) : (
                        <Image
                            source={require('../assets/fruit.png')}
                            style={styles.fruitImage}></Image>
                    )}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.selectGalleryImage.bind(this)}><Text style={{ fontWeight: "bold" }}>Resim seç</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.takePhoto.bind(this)}><Text style={{ fontWeight: "bold" }}>Resim çek</Text></TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    titleContainer: {
        marginTop: 70,
        marginLeft: 40,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        fontWeight: "bold",
        color: 'black',
        fontSize: 16,
    },
    button: {
        margin: 10,
        width: 200,
        height: 57,
        backgroundColor: 'green',
        color: "red",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonContainer: {
        paddingBottom: 40,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    imageContainer: {

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fruitImage: {
        width: 250,
        height: 250,
        resizeMode: 'contain',

    },
});
