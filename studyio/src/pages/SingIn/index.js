import { React, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RecoverModal } from '../../modais/RecoverPassword';
import Toast from 'react-native-toast-message';
import { useUser } from '../../hooks/useContextUserId';
import { LoginUser } from '../../hooks/useUser';


export function SingIn() {
    const navigation = useNavigation();
    const [visibleModal, setVisibleModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { userId, setUserId, ip, token, setToken } = useUser();

    async function handleLogin() {
        const data = {
            username: username,
            password: password
        };
        try {
            console.log(ip);
            await LoginUser(data, ip).then((response) => {
                setUserId(response.data.userId);
                setToken(response.data.token);
                Toast.show({
                    type: 'success',
                    text1: 'Login successfully!',
                    text2: `Welcome ${username}!`
                });
                setTimeout(() => {
                    navigation.navigate('Temporary', { userId: userId});
                }, 1500);
            }).catch((error) => {
                console.log(error);
                Toast.show({
                    type: 'error',
                    text1: 'Invalid credentials!',
                });
            });
        } catch (error) {
            console.error('Error occurred while login:', error);
        };
    };

    return (
        <View style={styles.container}>
            <Toast />
            <Image
                source={require('../../assets/Logo2.png')}
                style={{ width: '100%', marginTop: '15%', marginBottom: '15%' }}
                resizeMode='contain'
            />
            <Text style={styles.title}>Username:</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername} />

            <Text style={styles.title}>Password:</Text>
            <TextInput
                style={styles.input}
                value={password}
                secureTextEntry={true}
                onChangeText={setPassword} />

            <Modal
                visible={visibleModal}
                transparent={true}
                onRequestClose={() => setVisibleModal(false)}>
                <RecoverModal
                    handleClose={() => setVisibleModal(false)} />
            </Modal>

            <TouchableOpacity>
                <Text style={styles.textRecoverPass}
                    onPress={() => setVisibleModal(true)}>Forgot your password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleLogin()}>
                <Text style={styles.textButton}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.textRegister}
                    onPress={() => navigation.navigate('SingUp')}>New? Register</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F5F6',
    },
    button: {
        justifyContent: 'center',
        backgroundColor: '#004257',
        borderRadius: 10,
        width: 132,
        height: 37,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 150

    },
    textButton: {
        fontSize: 20,
        color: '#DAE9F1',
        alignItems: 'center'
    },
    textRegister: {
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 5,
        color: '#006699'
    },
    textRecoverPass: {
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginTop: 7,
        marginLeft: 30,
        color: '#006699'
    },
    title: {
        fontSize: 16,
        marginLeft: 33,
        color: '#004257'
    },
    input: {
        backgroundColor: '#A4C3DA',
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        padding: 2
    }
})