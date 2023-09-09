import React, { useState, useEffect } from "react";
import { 
    SafeAreaView, 
    View, 
    TouchableOpacity, 
    Text, 
    StyleSheet, 
    TextInput, 
    Image, 
    ScrollView,
    ActivityIndicator
} from "react-native";
import { useUser } from '../../hooks/useContextUserId';
import Toast from 'react-native-toast-message';
import { EditCard } from "../../hooks/useCard";
import axios from "axios";

export function UpdateCard({ handleClose, selectedItem }) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState(null);
    const { userId, ip, token, reqConfig } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (selectedItem) {
            setQuestion(selectedItem.card_name);
            setAnswer(selectedItem.card_content);
        }
    }, [selectedItem]);

    async function cardGptHandle(title) {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${ip}/openai/create/card`,
                {
                    cardTitle: title
                },
                reqConfig
            );
            
            setAnswer(response.data.response);
            setIsLoading(!isLoading);
        } catch (error) {
            if(error instanceof Error){
                console.log(error.message);
            }
            Toast.show({
                type: 'error',
                text1: error,
            });
        } finally{
            setIsLoading(false);
        }
    }

    async function handleUpdateCard(){
        const data = {
            cardName: question,
            cardContent: answer
        };
        try {
            await EditCard(selectedItem.id, data, ip, token).then(() => {
                handleClose();
            }).catch(() => {
                Toast.show({
                    type: 'error',
                    text1: 'Card already exists!',
                });
            })
        } catch(error) {
            console.error('Error occurred while editing card:', error);
        }

    };

    async function handleListTag() {
        try {
            const response = await ListTags(userId, ip, token);
            const data = response.data;
            const tagOptions = data.map(tag => ({ label: tag.tag_name, key: tag.id }));
            setTagOptions(tagOptions);
        } catch (error) {
            console.error('Error occurred while listing tags: ', error);
        }
    }

    useEffect(() => {
        handleListTag();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.modal}>
            <View style={styles.cardHeader}>
            <Text style={styles.textButton}>Edit a Card</Text>
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
                    multiline={true}
                    numberOfLines={undefined}
                    value={question}
                    onChangeText={setQuestion}
                />
            </ScrollView>

            <ScrollView>
            <Text style={styles.title}>Answer:</Text>
                <View>
                    {isLoading && (
                        <ActivityIndicator size="large" color="#004257"  style={{zIndex: 2 ,position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}/>
                    )}
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        numberOfLines={undefined}
                        value={answer}
                        onChangeText={setAnswer}
                    />
                </View>
            </ScrollView>

            <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => cardGptHandle(question)}
                >
                <Text style={styles.textButton}>Generate with AI</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleUpdateCard()}
                >
                <Text style={styles.textButton}>Save</Text>
                </TouchableOpacity>
            </View>
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
