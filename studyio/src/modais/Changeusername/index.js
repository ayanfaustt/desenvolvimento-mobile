import { React, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, SafeAreaView, TextInput} from 'react-native';
import { globalStyles } from '../../styles/global';

export function ChangeusernameModal ({ handleClose}) {

    return (
        <SafeAreaView style={{backgroundColor: 'rgba(0, 0, 0, 0.2)', height: 1000}}>
            <View style={styles.container2}>
            <View style={styles.button}>
                        <Text style={globalStyles.textButton}>Change username</Text>
                    </View>

                    <TouchableOpacity onPress={handleClose}>
                        <Image 
                        source={require('../../assets/x.png')}
                        style={{ position: 'absolute', left: 110, top: 10}}
                        resizeMode='contain'/>
                    </TouchableOpacity>
            </View>

            <View style={styles.container}>
                    <Text style={styles.title}>New Username</Text>
                    <TextInput style={styles.text_input}></TextInput>
                    
                    <TouchableOpacity style={styles.button_save} onPress={ handleClose }>
                        <Text style={globalStyles.textButton}>Change</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    button_save: {
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: '#004257',
        borderRadius: 10,
        width: 145,
        height: 45,
        alignItems: 'center',
        marginHorizontal: 'auto',
        alignSelf: 'center',
        bottom: 35
    },
    button: {
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: '#004257',
        borderRadius: 10,
        width: 200,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        top: -25,
        left: 20,
        flexDirection: 'row',
    },
    container2:{
        width: 307,
        height: 260,
        borderRadius: 10,
        marginTop: 205,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor:'#F1F5F6',
        borderColor: '#004257',
        borderWidth: 0.5,
        flexDirection: 'row'
    },
    title: {
        fontSize: 18,
        position: 'absolute',
        color: '#004257',
        alignItems: 'center',
        alignSelf: 'center',
        top: -200,
        left: 80,
    },
    text_input: {
        position: 'absolute',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#A4C3DA',
        width: 190,
        height: 30,
        alignSelf: 'center',
        top: -170,
        alignContent:'center',
        fontSize: 14,
        textAlign: 'center',
        color: '#004257',
        left: 75,
        backgroundColor: '#A4C3DA'
    },
})