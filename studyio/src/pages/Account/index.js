import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { globalStyles } from '../../styles/global';

export function Account() {

    return (
        <View style={globalStyles.container2}>
            <View>
                <Image
                    source={require('../../assets/cara.png')}
                    style={{ alignSelf: 'center', marginTop: 30 }} />
                <Image
                    source={require('../../assets/edit.png')}
                    style={{ alignSelf: 'center', marginTop: 30 }} />
            </View>
            <View style={styles.fields}>
                <View style={styles.fieldsInside}>
                    <View style={styles.iconInput}>
                        <Image
                            source={require('../../assets/user-icon.png')}
                            style={{}} />
                        <TextInput style={styles.input} placeholder='user' />
                    </View>
                    <Image
                        source={require('../../assets/edit-2.png')}
                        style={{}} />
                </View>
            </View>
            <View>
                <TextInput style={styles.banana} />
            </View>
            <TouchableOpacity
                style={styles.button}>
                <Text style={globalStyles.textButton}>Change password</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    banana: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 80,
        borderRadius: 10,
        padding: 2,
        backgroundColor: '#A4C3DA',
    },
    button: {
        justifyContent: 'center',
        backgroundColor: '#004257',
        borderRadius: 10,
        width: 232,
        height: 47,
        alignSelf: 'center',
        alignItems: 'center',
        bottom: '10%',
        marginTop: 100
    },
    fields: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 28,
    },
    fieldsInside: {
        flexDirection: 'row',
        borderBottomWidth: 2,
    },
    input: {

    },
    iconInput: {
        flexDirection: 'row',
    }
})