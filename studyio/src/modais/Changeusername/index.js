import { React, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, SafeAreaViewBase} from 'react-native';

export function ChangeusernameModal ({ handleClose}) {

    return (
        <SafeAreaViewBase style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', height: 1000}}>
            <View style={styles.button}>
                <Text style={globalStyles.textButton}>Change username</Text>
                <TouchableOpacity onPress={ handleClose }
                    hitSlop={{top: 25, bottom: 25, left: 15, right: 15}}>
                    <Image 
                        source={require('../../assets/x.png')}
                        style={{left: 10}}/>
                </TouchableOpacity>
            </View>
        </SafeAreaViewBase>
    )
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: '#004257',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        width: 233,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        top: 385,
        flexDirection: 'row',
    },
    container:{
        width: 233,
        height: 260,
        marginTop: 385,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor:'#00212C',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10
    },
})