import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'

export default function SingIn() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/Logo2.png')}
                style={{ width: '100%', marginTop: 51, marginBottom: 30}}
                resizeMode='contain'
            />
            <Text style={styles.title}>Name:</Text>
            <TextInput
                style={styles.input}/>

            <Text style={styles.title}>Email:</Text>
            <TextInput
                style={styles.input}/>
            
            <Text style={styles.title}>Password:</Text>
            <TextInput
                style={styles.input}/>

            <Text style={styles.title}>Confim password:</Text>
            <TextInput
                style={styles.input}/>
            
            <TouchableOpacity 
            style={styles.button}
            onPress={ () => navigation.navigate('SingIn')}>
                <Text style={styles.textButton}>Register</Text>
            </TouchableOpacity>
            
            <TouchableOpacity>
                <Text style={styles.textSingin}
                onPress={ () => navigation.navigate('SingIn')}>Already have an account? Sign in</Text>
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
        marginTop: 40

    },
    textButton:{
        fontSize: 20,
        color: '#DAE9F1',
        alignItems: 'center'
    },
    textSingin:{
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 7,
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