import {React, useState} from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image, SafeAreaView, TextInput } from "react-native";
import { globalStyles } from '../../styles/global';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useUser } from '../../hooks/useContextUserId';
import { UpdateUser } from '../../hooks/useUser';

export function ChangepassModal ({ handleClose }) {

    const navigation = useNavigation();
    const [new_password, setNewPassword] = useState('')
    const [confirm_Password, setConfirmPassword] = useState('');
    const { userId, token, ip } = useUser();

    async function handleUpdatePassword() {
        const data = {
            password: new_password
        };
        if (!new_password) {
            console.error('Password cannot be null!');
        } else if (new_password != confirm_Password) { // Compare passwords
            console.error('Passwords are not the same');
        } else {
            try {
                await UpdateUser(userId, data, ip, token).then(() => {
                    Toast.show({
                        type: 'success',
                        text1: 'Password updated successfully!',
                        text2: 'You will be redirected to the login page in a few seconds!'
                    });
                    handleClose();
                    setTimeout(() => {
                        navigation.navigate('SingIn');
                    }, 4500);
                }).catch((error) => {
                    Toast.show({
                        type: 'error',
                        text1: 'Failed at updating password!',
                    });
                })
            } catch (error) {
                console.error('Error occurred while updating password:', error);
            };
        };
    };

    return (
            <SafeAreaView style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', height: 1000}}>
                <View style={styles.button}>
                    <Text style={globalStyles.textButton}>Change password</Text>
                    <TouchableOpacity onPress={ handleClose }
                        hitSlop={{top: 25, bottom: 25, left: 15, right: 15}}>
                        <Image 
                            source={require('../../assets/down_arrow.png')}
                            style={{left: 10}}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.container}>

                    <Text style={styles.title2}>Confirm Password</Text>
                    <TextInput style={styles.text_input2} 
                    secureTextEntry={true}
                    value={new_password}
                    onChangeText={setNewPassword}
                    ></TextInput>
                    
                    <TouchableOpacity 
                        style={styles.button_save} 
                        onPress={ handleUpdatePassword }>
                        <Text style={globalStyles.textButton}>Change</Text>
                    </TouchableOpacity>

                    <Text style={styles.title1}>New Password</Text>
                    <TextInput style={styles.text_input1} 
                    secureTextEntry={true}
                    value={confirm_Password}
                    onChangeText={setConfirmPassword}
                    ></TextInput>
                    
                    <TouchableOpacity 
                        style={styles.button_save} 
                        onPress={ handleUpdatePassword }>
                        <Text style={globalStyles.textButton}>Change</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
    )
}

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
        bottom: 20
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
    title1: {
        fontSize: 18,
        position: 'absolute',
        color: '#DAE9F1',
        alignItems: 'center',
        alignSelf: 'center',
        top: 15
    },
    text_input1: {
        position: 'absolute',
        borderWidth: 2,
        borderRadius: 100,
        borderColor: '#DAE9F1',
        width: 190,
        height: 30,
        alignSelf: 'center',
        top: 50,
        alignContent:'center',
        fontSize: 14,
        textAlign: 'center',
        color: '#DAE9F1'
    },
    title2: {
        fontSize: 18,
        position: 'absolute',
        color: '#DAE9F1',
        alignItems: 'center',
        alignSelf: 'center',
        top: 100
    },
    text_input2: {
        position: 'absolute',
        borderWidth: 2,
        borderRadius: 100,
        borderColor: '#DAE9F1',
        width: 190,
        height: 30,
        alignSelf: 'center',
        top: 130,
        alignContent:'center',
        fontSize: 14,
        textAlign: 'center',
        color: '#DAE9F1'
    },
})