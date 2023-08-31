import { React, useState } from "react";
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet, TextInput, Image } from "react-native";
import { CreateNewTag } from "../../hooks/useTag";
import { useUser } from "../../hooks/useContextUserId";
import Toast from 'react-native-toast-message';

export function CreateTag({ handleClose, data }) {
    const [tag, setTag] = useState('');
    const { userId, ip, token } = useUser();

    async function handleCreateTag(){
        const data = {
            tagName: tag
        }
        try {
            await CreateNewTag(userId, data, ip, token).then(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Tag created successfully!'
                });
                handleClose();
            }).catch(() => {
                Toast.show({
                    type: 'error',
                    text1: 'Tag already exist!',
                });
            })
        } catch(error) {
            console.error('Error occurred while create tag:', error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cardHeader}>
                <Text style={styles.textButton}>Create a tag: {data}</Text>
            </View>
            <TouchableOpacity onPress={handleClose}>
                <Image
                source={require('../../assets/x.png')}
                style={{position: 'absolute', marginLeft: 280, bottom: 100}}
                resizeMode='contain'/>
            </TouchableOpacity>
            <Text style={styles.title}>Tag name:</Text>
            <TextInput
                style={styles.input}
                value={tag}
                onChangeText={setTag}/>
            <View>
            </View>
            <View>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={ () => handleCreateTag()}>
                    <Text style={styles.textButton}>Add</Text>
                </TouchableOpacity>
            </View>
            <Toast />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        width: 307,
        height: 260,
        borderRadius: 10,
        marginTop: 250,
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
        marginLeft: 33,
        color: '#004257',
        marginTop: '-20%'
    },
    input:{
        backgroundColor: '#A4C3DA',
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        padding: 2
    }
})