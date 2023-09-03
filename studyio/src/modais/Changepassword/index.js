import {React, useState} from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image, SafeAreaView, TextInput } from "react-native";
import { globalStyles } from '../../styles/global';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useUser } from '../../hooks/useContextUserId';
import { UpdateUser } from '../../hooks/useUser';

export function ChangepassModal ({ handleClose }) {

    const navigation = useNavigation();
    const { userId, token, ip } = useUser();
    const [new_password, setNewPassword] = useState('')
    const [confirm_Password, setConfirmPassword] = useState('');
    const [showPassword1, setShowPassword1] = useState(false); // State to control password visibility for input 1
    const [showPassword2, setShowPassword2] = useState(false); // State to control password visibility for input 2

    // Function to toggle password visibility for input 1
    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };

    // Function to toggle password visibility for input 2
    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };

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

                <Text style={styles.title1}>New Password</Text>
                    <TextInput style={styles.text_input1} 
                    hitSlop={{top: 15, bottom: 15, left: 15, right: -20}}
                    secureTextEntry={!showPassword1}
                    value={confirm_Password}
                    onChangeText={setConfirmPassword}
                    ></TextInput>

                    <Text style={styles.title2}>Confirm Password</Text>
                    <TextInput style={styles.text_input2}
                    hitSlop={{top: 15, bottom: 15, left: 15, right: -20}} 
                    secureTextEntry={!showPassword2} // Toggle secureTextEntry based on state
                    value={new_password}
                    onChangeText={setNewPassword}
                    ></TextInput>

                    <TouchableOpacity
                        style = {styles.eye_icon}
                        hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
                        onPress={togglePasswordVisibility1}  // Toggle password visibility on icon press
                        ><Image
                            style={{}}
                            source={require('../../assets/eye.png')}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style = {styles.eye_icon2}
                        onPress={togglePasswordVisibility2}
                        hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}  // Toggle password visibility on icon press
                        ><Image
                            style={{}}
                            source={require('../../assets/eye.png')}/>
                    </TouchableOpacity>
                    
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
    eye_icon: {
        position: 'absolute',
        left: 180,
        top: 55
    },
    eye_icon2: {
        left: 180,
        position: 'absolute',
        bottom: 105
    }
})