import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SingIn() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/Logo2.png')}
                style={{ width: '100%', marginTop: 51, marginBottom: 50}}
                resizeMode='contain'
            />
            <Text style={styles.title}>Email:</Text>
            <TextInput
                style={styles.input}/>
            
            <Text style={styles.title}>Password:</Text>
            <TextInput
                style={styles.input}/>
            
            <TouchableOpacity>
                <Text style={styles.textRecoverPass}
                onPress={ () => navigation.navigate('SingUp')}>Forgot your password?</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
            style={styles.button}
            onPress={ () => navigation.navigate('Dashboard')}>
                <Text style={styles.textButton}>Login</Text>
            </TouchableOpacity>
            
            <TouchableOpacity>
                <Text style={styles.textRegister}
                onPress={ () => navigation.navigate('SingUp')}>New? Register</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F1F5F6',
    },
    button:{
        justifyContent: 'center',
        backgroundColor: '#004257',
        borderRadius: 10,
        width: 132,
        height: 37,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 150

    },
    textButton:{
        fontSize: 20,
        color: '#DAE9F1',
        alignItems: 'center'
    },
    textRegister:{
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 5,
        color: '#006699'
    },
    textRecoverPass:{
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginTop: 7,
        marginLeft: 30,
        color: '#006699'
    },
    title:{
        fontSize: 16,
        marginLeft: 33,
        color: '#004257'
    },
    input:{
       backgroundColor: '#A4C3DA',
       marginLeft: 30,
       marginRight: 30,
       borderRadius: 10,
       padding: 2
    }
})