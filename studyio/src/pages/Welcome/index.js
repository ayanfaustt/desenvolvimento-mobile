import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { AppIntroSlider } from 'react-native-app-intro-slider';

export default function Welcome() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={{ width: '100%', marginTop: 58 }}
                resizeMode='contain'
            />
            <TouchableOpacity 
            style={styles.button}
            onPress={ () => navigation.navigate('SingIn')}>
                <Text style={styles.textButton}>Login</Text>
            </TouchableOpacity>
            
            <TouchableOpacity>
                <Text style={styles.textRegister}
                onPress={ () => navigation.navigate('SingUp')}>New? Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F1F5F6',
    },
    button:{
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: '#004257',
        borderRadius: 10,
        width: 132,
        height: 37,
        alignSelf: 'center',
        alignItems: 'center',
        bottom: '10%'

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
        marginTop: 430,
        color: '#006699'
    }
});

const slides = [
    {
        key: 'dashboards',
        title: "Dashboards",
        text: 'Follow your development!',
        image: require('../../assets/Dashboard.png')
    }
]