import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, SafeAreaView} from 'react-native';
import {AutoSizeText} from 'react-native-auto-size-text';

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
        <SafeAreaView style={{display: 'flex', flexDirection: 'column', gap: 20}}>

          <Text>
            New Password
          </Text>

          <TextInput 
            hitSlop={{top: 15, bottom: 15, left: 15, right: -20}}
            secureTextEntry={!showPassword1}
            value={confirm_Password}
            onChangeText={setConfirmPassword}
          />

          <Text>
            Confirm Password
          </Text>

          <TextInput
            hitSlop={{top: 15, bottom: 15, left: 15, right: -20}} 
            secureTextEntry={!showPassword2} // Toggle secureTextEntry based on state
            value={new_password}
            onChangeText={setNewPassword}
          />

          <TouchableOpacity
            style = {styles.eye_icon}
            hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
            onPress={togglePasswordVisibility1}  // Toggle password visibility on icon press
          > 
            <Image
              style={{}}
              source={require('../../assets/eye.png')}
            />
          </TouchableOpacity>


          <TouchableOpacity
            style = {styles.eye_icon2}
            onPress={togglePasswordVisibility2}
            hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}  // Toggle password visibility on icon press
          >
            <Image
              style={{}}
              source={require('../../assets/eye.png')}
            />
          </TouchableOpacity>

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
  input:{
      backgroundColor: '#A4C3DA',
      marginLeft: 30,
      marginRight: 30,
      borderRadius: 10,
      padding: 2
  }
})

export default MaterialModal;