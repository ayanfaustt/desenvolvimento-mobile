import { React, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, TextInput} from 'react-native';
import { globalStyles } from '../../styles/global';
import { useUser } from '../../hooks/useContextUserId';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { UpdateUser } from '../../hooks/useUser';

export function ChangeEmailModal ({ handleClose}) {
    const navigation = useNavigation();
    const [new_email, setEmail] = useState('');
    // const { email } = useUser();
    const { userId, ip } = useUser();

    async function handleUpdateEmail() {
        const data = {
            email: new_email
        };
        if (!new_email) {
            console.error('E-mail cannot be null!');
        } else {
            try {
                await UpdateUser(userId, data, ip).then(() => {
                    Toast.show({
                        type: 'success',
                        text1: `E-mail updated successfully to ${new_email}!`,
                        text2: "You'll be redirect to the login page in a few seconds!"
                    });
                    setTimeout(() => {
                        navigation.navigate('SingIn');
                    }, 4500);
                }).catch(() => {
                    Toast.show({
                        type: 'error',
                        text1: 'E-mail already exist!',
                    });
                })
            } catch (error) {
                console.error('Error occurred while updating E-mail:', error);
            };
        };
    };
    
    return (
        <SafeAreaView style={{backgroundColor: 'rgba(0, 0, 0, 0.2)', height: 1000}}>
            <View style={styles.container2}>
            <View style={styles.button}>
                    <Text style={globalStyles.textButton}>Change E-mail</Text>
                    </View>
                    <TouchableOpacity onPress={handleClose}>
                        <Image 
                        source={require('../../assets/x.png')}
                        style={{ position: 'absolute', left: 110, top: 10}}
                        resizeMode='contain'/>
                    </TouchableOpacity>
            </View>

            <View style={styles.container}>
                    <Text style={styles.title}>New E-mail</Text>
                    <TextInput 
                    style={styles.text_input}
                    value={new_email}
                    onChangeText={setEmail}
                    ></TextInput>
                    <TouchableOpacity style={styles.button_save}>
                        <Text style={globalStyles.textButton}
                        onPress={() => handleUpdateEmail()}
                        >Change</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    )
};

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
        bottom: 35
    },
    button: {
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: '#004257',
        borderRadius: 10,
        width: 200,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        top: -25,
        left: 20,
        flexDirection: 'row',
    },
    container2:{
        width: 307,
        height: 260,
        borderRadius: 10,
        marginTop: 205,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor:'#F1F5F6',
        borderColor: '#004257',
        borderWidth: 0.5,
        flexDirection: 'row'
    },
    title: {
        fontSize: 18,
        position: 'absolute',
        color: '#004257',
        alignItems: 'center',
        alignSelf: 'center',
        top: -200,
        left: 80,
    },
    text_input: {
        position: 'absolute',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#A4C3DA',
        width: 190,
        height: 30,
        alignSelf: 'center',
        top: -170,
        alignContent:'center',
        fontSize: 14,
        textAlign: 'center',
        color: '#004257',
        left: 75,
        backgroundColor: '#A4C3DA'
    },
})