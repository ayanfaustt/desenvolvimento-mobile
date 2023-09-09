import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, SafeAreaView, TextInput} from 'react-native';
import {AutoSizeText} from 'react-native-auto-size-text';
import { globalStyles } from '../../styles/global';
import { UpdateUser } from '../../hooks/useUser';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons'
import { useUser } from '../../hooks/useContextUserId';

export function ChangePasswordModal ({ visible, closeModal}) {
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
        closeModal();
        Toast.show({
          type: 'error',
          text1: `Password field is empty`
        })
      }else if (new_password != confirm_Password) { // Compare passwords
          Toast.show({
            type: 'error',
            text1: `Passwords do not match`,
            style:{
              zIndex:9999
            }
        });
      } else {
          try {
              await UpdateUser(userId, data, ip, token).then(() => {
                  Toast.show({
                      type: 'success',
                      text1: 'Password updated successfully!',
                      text2: 'You will be redirected to the login page in a few seconds!',
                      style:{
                        zIndex:9999
                      }
                      
                  });
                  closeModal();
                  setTimeout(() => {
                      navigation.navigate('SingIn');
                  }, 4500);
              }).catch((error) => {
                closeModal();
                Toast.show({
                    type: 'error',
                    text1: `Failed at updating password : ${error}`,
                });
              })
          } catch (error) {
            Toast.show({
                type: 'error',
                text1: `Error occurred while updating password: ${error}`,
                style:{
                  zIndex:9999
                }
                
            });
          };
      };
  };
  return(
    <Modal visible={visible} animationType='fade' transparent={true}>
      <SafeAreaView style={styles.container} >
        <View style={styles.cardHeader}>
          <AutoSizeText
            style={styles.title}
            fontSize={16}
            maxFontSize={18}
            minFontSize={10}
          >
            Change Password
          </AutoSizeText>
        </View>
        <TouchableOpacity onPress={closeModal}>
          <Image
            source={require('../../assets/x.png')}
            style={{position: 'relative', left: '90%', bottom:'100%'}}
            resizeMode='contain'/>
        </TouchableOpacity>
        <SafeAreaView style={{display: 'flex', flexDirection: 'column', gap: 10}}>

          <Text
            style={styles.inputText}
          >
            New Password
          </Text>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input}
              hitSlop={{top: 15, bottom: 15, left: 15, right: -20}}
              secureTextEntry={!showPassword1}
              value={confirm_Password}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
              style = {styles.eye_icon}
              hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
              onPress={togglePasswordVisibility1}  // Toggle password visibility on icon press
            > 
              <Icon name='eye-outline' size={30} color='#024959'/>
            </TouchableOpacity>
          </View>

          <Text
            style={styles.inputText}
          >
            Confirm Password
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
            style={styles.input}
              hitSlop={{top: 15, bottom: 15, left: 15, right: -20}} 
              secureTextEntry={!showPassword2} // Toggle secureTextEntry based on state
              value={new_password}
              onChangeText={setNewPassword}
            />

            <TouchableOpacity
              style = {styles.eye_icon2}
              onPress={togglePasswordVisibility2}
              hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}  // Toggle password visibility on icon press
            >
              {togglePasswordVisibility2 ? (
                <Icon name='eye-outline' size={30} color='#024959'/>

              ) : (
                <Icon name='eye-off-outline' size={30} color='#024959'/>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.button_save} 
            onPress={ handleUpdatePassword }>
              <Text style={globalStyles.textButton}>Change</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container:{
      width: 307,
      height: 260,
      borderRadius: 10,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -153.5 }, { translateY: -130 }],
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor:'#F1F5F6',
      borderColor: '#004257',
      borderWidth: 0.5,
      
  },
  cardHeader:{
      backgroundColor: '#004257',
      width: 170,
      height: 42,
      justifyContent: 'center',
      alignSelf: 'center',
      position: "absolute",
      top: -20,
      left: 15,
      borderRadius: 10
  },
  contentContainer:{
    marginLeft: 5,
    fontSize: 14
  },
  inputContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  addButton:{
      backgroundColor: '#004257',
      borderRadius: 10,
      height: 37,
      width: 132,
      alignSelf: 'center',
      position: 'absolute',
      top: 70,
      justifyContent: 'center'
  },
  textButton:{
      color: '#DAE9F1',
      alignSelf: 'center'
  },
  title:{
      fontSize: 16,
      marginLeft:5,
      color: 'white',
  },
  inputText:{
    marginLeft:5,
  },
  input:{
      backgroundColor: '#A4C3DA',
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 10,
      width:250,
      padding: 2
  },
  eye_icon: {

  },
  button_save: {
    backgroundColor: '#004257',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: 10,
    width: 90,
    height: 30
  }
});