import React from "react";
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet, TextInput, Image } from "react-native";

export function RecoverModal({ handleClose }) {
    return (
        <SafeAreaView style={styles.container}>
            {/* <TouchableOpacity  onPress={handleClose}></TouchableOpacity> */}
            <View style={styles.cardHeader}>
                <Text style={styles.textButton}>Recover Password</Text>
            </View>
            <TouchableOpacity onPress={handleClose}>
                <Image
                source={require('../../assets/x.png')}
                style={{ position: 'absolute', right: 5, top: -110}}
                resizeMode='contain'/>
            </TouchableOpacity>
            <Text style={styles.title}>Email:</Text>
            <TextInput
                style={styles.input}/>
            <View>
                <TouchableOpacity 
                    style={styles.recoveryButton}
                    onPress={ () => {} }>
                    <Text style={styles.textButton}>Recover</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        width: 307,
        height: 260,
        borderRadius: 10,
        marginTop: 250,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor:'#F1F5F6',
        borderColor: '#004257',
        borderWidth: 0.5
        
    },
    cardHeader:{
        backgroundColor: '#004257',
        width: 202,
        height: 42,
        justifyContent: 'center',
        alignSelf: 'center',
        position: "absolute",
        top: -20,
        left: 15,
        borderRadius: 10
    },
    recoveryButton:{
        backgroundColor: '#004257',
        borderRadius: 10,
        height: 37,
        width: 132,
        alignSelf: 'center',
        position: 'absolute',
        top: 50,
        justifyContent: 'center'
    },
    textButton:{
        color: '#DAE9F1',
        alignSelf: 'center'
    },
    title:{
        fontSize: 16,
        marginLeft: 33,
        color: '#004257',
        marginTop: -30
    },
    input:{
        backgroundColor: '#A4C3DA',
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        padding: 2
    }
})