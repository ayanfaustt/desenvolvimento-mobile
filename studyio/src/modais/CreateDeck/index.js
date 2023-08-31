import { React, useState, useEffect } from "react";
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet, TextInput, Image, Picker } from "react-native";
import { useUser } from '../../hooks/useContextUserId';
import Toast from 'react-native-toast-message';
import { CreateNewDeck } from "../../hooks/useDeck";
import { ListTags } from "../../hooks/useTag";
import RNPickerSelect from 'react-native-picker-select';

export function CreateDeck({ handleClose }) {
    const [deckName, setDeckName] = useState('');
    const [selectedTag, setSelectedTag] = useState(null);
    const [tagOptions, setTagOptions] = useState([]);
    const { userId, ip, token } = useUser();

    async function handleCreateDeck(){
        const data = {
            deckName: deckName,
            tagId: selectedTag
        };
        try {
            await CreateNewDeck(userId, data, ip, token).then(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Deck created successfully!'
                });
                handleClose();
            }).catch(() => {
                Toast.show({
                    type: 'error',
                    text1: 'Deck already exist!',
                });
            })
        } catch(error) {
            console.error('Error occurred while create deck:', error);
        }
    }

    async function handleListTag() {
        try {
            const response = await ListTags(userId, ip, token);
            const data = response.data;
            const tagOptions = data.map(tag => ({ label: tag.tag_name, value: tag.id }));
            setTagOptions(tagOptions);
        } catch (error) {
            console.error('Error occurred while list tags: ', error);
        }
    }

    function handleInputChange(name, value) {
        setSelectedTag(value);
    }

    useEffect(() => {
        handleListTag();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cardHeader}>
                <Text style={styles.textButton}>Create a deck</Text>
            </View>
            <TouchableOpacity onPress={handleClose}>
                <Image
                source={require('../../assets/x.png')}
                style={{ position: 'relative', marginLeft: 270, bottom: 0 }}
                resizeMode='contain'/>
            </TouchableOpacity>
            <Text style={styles.title}>Deck name:</Text>
            <TextInput
                style={styles.input}
                value={deckName}
                onChangeText={setDeckName}/>
            <Text style={styles.title}>Tag:</Text>
                <View style={styles.tagInput}>
                    <RNPickerSelect
                        onValueChange={(value) => handleInputChange('tagId', value)}
                        items={tagOptions}
                        onOpen={() => setSelectedTag(null)}
                        placeholder={{ label: 'Selecione uma tag', value: null }}
                        style={{
                            placeholder: {
                                color: '#004257'
                            },
                        }}
                        hideDoneBar
                    />
                </View>
            <View>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={ () => handleCreateDeck()}>
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
        borderRadius: 10,
        marginTop: 250,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#F1F5F6',
        borderColor: '#004257',
        borderWidth: 0.5,
        paddingTop: 20,
        paddingBottom: 60
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
        position: 'relative',
        top: 20,
        bottom: 20,
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
        marginTop: 5
    },
    input:{
        backgroundColor: '#A4C3DA',
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        padding: 2
    },
    tagInput: {
        backgroundColor: '#A4C3DA',
        // height: 30,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        
    },
})