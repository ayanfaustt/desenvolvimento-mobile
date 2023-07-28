import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { globalStyles } from '../../styles/global';

export function Account() {

    return (
        <View style={globalStyles.container2}>
            <Image
                source={require('../../assets/cara.png')}
                style={{alignSelf: 'center', marginTop: 30}}/>
            <TextInput style={styles.banana}/>
            <TextInput style={styles.banana}/>
            <TouchableOpacity 
                style={styles.button}>
                    <Text style={globalStyles.textButton}>Change password</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create ({
    banana:{
        marginLeft: 30,
        marginRight: 30,
        marginTop: 80,
        borderRadius: 10,
        padding: 2,
        backgroundColor: '#A4C3DA',
    },
    button:{
        justifyContent: 'center',
        backgroundColor: '#004257',
        borderRadius: 10,
        width: 232,
        height: 47,
        alignSelf: 'center',
        alignItems: 'center',
        bottom: '10%',
        marginTop: 100
    }
})