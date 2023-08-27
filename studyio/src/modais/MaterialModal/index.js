import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, SafeAreaView} from 'react-native';
import {AutoSizeText} from 'react-native-auto-size-text';
import Icon from 'react-native-vector-icons/Ionicons'


function MaterialModal ({data, visible, closeModal}) {
  const [name, setName] = useState(data.name);
  const [author, setAuthor] = useState(data.author);
  const [description, setDescription] = useState(data.description);
  const [type, setType] = useState(data.type);

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
            {type}:{name}
          </AutoSizeText>
        </View>
        <TouchableOpacity onPress={closeModal}>
          <Image
            source={require('../../assets/x.png')}
            style={{position: 'relative', left: '90%', bottom:'100%'}}
            resizeMode='contain'/>
        </TouchableOpacity>
        <SafeAreaView style={{display: 'flex', flexDirection: 'column', gap: 20}}>
          <SafeAreaView style={styles.contentContainer}>
            <Text style={{color: "#024959", fontSize: 20}}>Author:</Text>
            <AutoSizeText
              fontSize={13}
              maxFontSize={14}
              minFontSize={11}
            >
              {author}
            </AutoSizeText>
          </SafeAreaView>
          <SafeAreaView style={styles.contentContainer}>
            <Text style={{color: "#024959", fontSize: 20}}>Description:</Text>
            <AutoSizeText>
              {description}
            </AutoSizeText>
          </SafeAreaView>
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