import { React, useState } from "react";
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet, TextInput, Image, Picker } from "react-native";

export function CreateSummarie({ handleClose }) {
    const [summarieName, setSummarieName] = useState('');
    const [tag, setTag] = useState('');

    async function handleCreateSummarie() {
        try {
            const response = await fetch(`http://192.168.0.165:8000/summaries/create/${1}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    summarieName: summarieName,
                    summarieContent: 'isso é só um teste',
                    isGpt: false,
                    tagId: '1'
                })
            });
            if (response.ok) {
                console.log('deu bom');


                handleClose()
            } else {
                handleClose()
                console.log('deu merda')

            }
        } catch (error) {
            console.error('Error occurred while create summarie:', error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cardHeader}>
                <Text style={styles.textButton}>Create a Summarie</Text>
            </View>
            <TouchableOpacity onPress={handleClose}>
                <Image
                    source={require('../../assets/x.png')}
                    style={{ position: 'absolute', marginLeft: 280, bottom: 100 }}
                    resizeMode='contain' />
            </TouchableOpacity>
            <Text style={styles.title}>Summarie name:</Text>
            <TextInput
                style={styles.input}
                value={summarieName}
                onChangeText={setSummarieName} />
            <View>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleCreateSummarie()}>
                    <Text style={styles.textButton}>Add</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 307,
        height: 260,
        borderRadius: 10,
        marginTop: 250,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#F1F5F6',
        borderColor: '#004257',
        borderWidth: 0.5,

    },
    cardHeader: {
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
    addButton: {
        backgroundColor: '#004257',
        borderRadius: 10,
        height: 37,
        width: 132,
        alignSelf: 'center',
        position: 'absolute',
        top: 70,
        justifyContent: 'center'
    },
    textButton: {
        color: '#DAE9F1',
        alignSelf: 'center'
    },
    title: {
        fontSize: 16,
        marginLeft: 33,
        color: '#004257',
        marginTop: '-20%'
    },
    input: {
        backgroundColor: '#A4C3DA',
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        padding: 2
    }
})