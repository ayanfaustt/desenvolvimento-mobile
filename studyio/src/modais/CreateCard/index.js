import React, { useState, useEffect } from "react";
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet, TextInput, Image, ScrollView } from "react-native";
import { useUser } from '../../hooks/useContextUserId';
import Toast from 'react-native-toast-message';
import { CreateNewCard } from "../../hooks/useCard";


export function CreateCard({ handleClose, selectedItem }) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState(null);
    const { ip, token } = useUser();

    async function handleCreateCard(){
        const data = {
            cardName: question,
            cardContent: answer,
            isGpt: false
        };
        try {
            await CreateNewCard(selectedItem.id, data, ip, token).then(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Card created successfully!'
                });
                handleClose();
            }).catch(() => {
                Toast.show({
                    type: 'error',
                    text1: 'Card already exists!',
                });
            })
        } catch(error) {
            console.error('Error occurred while creating card:', error);
    }
        
    };

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.modal}>
            <View style={styles.cardHeader}>
            <Text style={styles.textButton}>Create a Card</Text>
            </View>
            <TouchableOpacity onPress={handleClose}>
            <Image
                source={require("../../assets/x.png")}
                style={{ position: "relative", marginLeft: 260, bottom: 0 }}
                resizeMode="contain"
            />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Question:</Text>
            <TextInput
                style={styles.input}
                value={question}
                onChangeText={setQuestion}
            />
            <Text style={styles.title}>Answer:</Text>
            <TextInput
                style={styles.input}
                value={answer}
                onChangeText={setAnswer}
            />
            </ScrollView>
            <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleCreateCard()}
            >
            <Text style={styles.textButton}>Add</Text>
            </TouchableOpacity>
        </View>
        <Toast />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
      modal: {
        width: "80%",
        backgroundColor: "#F1F5F6",
        borderRadius: 10,
        padding: 15,
        borderColor: '#004257',
        borderWidth: 0.5
    },
      cardHeader: {
        backgroundColor: "#004257",
        width: 170,
        height: 42,
        justifyContent: "center",
        alignSelf: "center",
        position: "absolute",
        top: -20,
        left: 15,
        borderRadius: 10,
    },
      addButton: {
        backgroundColor: "#004257",
        borderRadius: 10,
        height: 37,
        width: 132,
        alignSelf: "center",
        position: "relative",
        top: 5,
        marginBottom: 10,
        marginTop: 50,
        justifyContent: "center",
    },
      textButton: {
        color: "#DAE9F1",
        alignSelf: "center",
    },
      title: {
        fontSize: 16,
        marginLeft: 7,
        color: "#004257",
        marginTop: 5,
    },
      input: {
        backgroundColor: "#A4C3DA",
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        padding: 7,
        width: '98%',
        height: 130
    },
})
