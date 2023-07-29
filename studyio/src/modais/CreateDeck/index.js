import { React, useState } from "react";
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet, TextInput, Image, Picker } from "react-native";

export function CreateDeck({ handleClose }) {
    const [deckName, setDeckName] = useState('');
    const [tag, setTag] = useState('');

    async function handleCreateDeck(){
        try {
            const response = await fetch(`http://192.168.0.109:3000/decks/create/:${33}`, {
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    deckName: deckName,
                    tagId: tag
                })
            });
            if (response.ok) {
                console.log('deu bom');
                handleClose
            } else {
                handleClose  
                console.log('deu merda')
            }
        } catch(error) {
            console.error('Error occurred while create deck:', error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cardHeader}>
                <Text style={styles.textButton}>Create a deck</Text>
            </View>
            <TouchableOpacity onPress={handleClose}>
                <Image
                source={require('../../assets/x.png')}
                style={{ position: 'absolute', right: '2%', bottom: 120}}
                resizeMode='contain'/>
            </TouchableOpacity>
            <Text style={styles.title}>Deck name:</Text>
            <TextInput
                style={styles.input}
                value={deckName}
                onChangeText={setDeckName}/>
            <Text style={styles.title2}>Tags:</Text>
            <TextInput
                style={styles.input}
                value={tag}
                onChangeText={setTag}/>
            <View>
            </View>
            <View>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={ () => handleCreateDeck()}>
                    <Text style={styles.textButton}>Add</Text>
                </TouchableOpacity>
            </View>
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
        borderWidth: 0.5
        
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
        top: 100,
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
    title2:{
        fontSize: 16,
        marginLeft: 33,
        color: '#004257',
        marginTop: '-35%'
    },
    input:{
        backgroundColor: '#A4C3DA',
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        padding: 2
    }
})