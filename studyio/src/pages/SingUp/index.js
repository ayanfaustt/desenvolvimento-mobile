import { React, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export function SingUp() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // ips das maquinas pra fazer as requisicoes
    // ipQuerem = '192.168.0.109'

    async function handleCreateUser() {
        if (password != confirmPassword) {
            console.error('Passwords diverge!');
        } else {
            try {
                const response = await fetch(`http://192.168.100.5:8000/user/create/${username}`, {
                    method: 'POST',
                    headers:{
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });
                if (response.ok) {
                    Toast.show({
                        type: 'success',
                        text1: 'User created successfully!',
                        text2: 'Please login to continue.'
                    });
                    setTimeout(() => {
                        navigation.navigate('SingIn');
                    }, 1500);
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'User already exist!',
                    });
                }
            } catch(error) {
                console.error('Error occurred while creating user:', error);
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Toast/>
            <Image
                source={require('../../assets/Logo2.png')}
                style={{ width: '100%', marginTop: 51, marginBottom: 30}}
                resizeMode='contain'
            />
            <Text style={styles.title}>Username:</Text>
            <TextInput
                style={styles.input} 
                value={username} 
                onChangeText={setUsername}/>

            <Text style={styles.title}>Email:</Text>
            <TextInput
                style={styles.input} 
                value={email} 
                onChangeText={setEmail}/>
            
            <Text style={styles.title}>Password:</Text>
            <TextInput
                style={styles.input} 
                value={password} 
                secureTextEntry={true}
                onChangeText={setPassword}/>

            <Text style={styles.title}>Confirm password:</Text>
            <TextInput
                style={styles.input} 
                value={confirmPassword} 
                secureTextEntry={true}
                onChangeText={setConfirmPassword}/>
            <TouchableOpacity 
            style={styles.button}
            onPress={()=> handleCreateUser()}>
                <Text style={styles.textButton}>Register</Text>
            </TouchableOpacity>
            
            <TouchableOpacity>
                <Text style={styles.textSingin}
                onPress={ () => navigation.navigate('SingIn')}>Already have an account? Sign in</Text>
            </TouchableOpacity>
        </SafeAreaView>
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