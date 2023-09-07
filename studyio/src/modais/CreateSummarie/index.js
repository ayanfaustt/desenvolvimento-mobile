import { React, useState, useEffect } from "react";
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet, TextInput, Image, Picker } from "react-native";
import { useUser } from '../../hooks/useContextUserId';
import { CreateNewSummarie } from '../../hooks/useSummarie';
import { ListTags } from '../../hooks/useTag';
// import RNPickerSelect from 'react-native-picker-select';
import ModalSelector from 'react-native-modal-selector';
import Toast from 'react-native-toast-message';
import axios from 'axios';

export function CreateSummarie({ handleClose }) {
    const { userId, ip, token } = useUser('');
    const [data, setData] = useState({ summarieName: "", tagId: "1", summarieContent: "" });
    const [selectedTag, setSelectedTag] = useState(null);
    const [tagOptions, setTagOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    async function handleCreateSummarie() {

        try {
            await CreateNewSummarie(userId, data, ip, token).then((res => {
                // console.log(res)
                handleClose()

            })).catch((error) => {
                console.error('Error fetching data:', error);
                handleClose()
            })
        } catch (error) {
            console.error('Error occurred while create summarie:', error);
        }
    }

    function handleInputChange(name, value) {

        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));

    }
    const handleGptGenerate = async (summarieName) => {
        console.log("clickei aq");
        console.log(summarieName);
        try {
            // setIsLoading(true);
            const response = await axios.post(
                `${ip}/openai/create/summarie`,
                {
                    summarieTitle: summarieName,
                },
                config
            );

            if(!response)
                throw new Error("Request faild");
            
            console.log(response.data);
            handleInputChange("summarieContent", response.data.content);

            // setIsLoading(false);
        } catch (error) {
            Toast.show({
                type: "error",
                text1: error
            });
            // setIsLoading(false);
        }
    };

    useEffect(() => console.log(data), [data])

    useEffect(() => {
        async function fetchTagOptions() {
            try {
                const response = await ListTags(userId, ip, token);
                const options = response.data.map(tag => ({
                    label: tag.tag_name,
                    value: tag.id,
                }));
                setTagOptions(options);
                console.log(options);
            } catch (error) {
                console.error("Error fetching tag options:", error);
            }
        }
        fetchTagOptions();
    }, [userId, ip]);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cardHeader}>
                <Text style={styles.textButton}>Create a Summarie</Text>
            </View>
            <TouchableOpacity onPress={handleClose}>
                <Image
                    source={require('../../assets/x.png')}
                    style={{ position: 'relative', marginLeft: 270, bottom: 0, }}
                    resizeMode='contain' />
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <Text style={styles.title}>Summarie name:</Text>
                <TextInput
                    name="summarieName"
                    style={styles.input}
                    value={data.summarieName}
                    onChangeText={(value) => handleInputChange('summarieName', value)} />
            </View>

            {/* <View>
            <Text style={styles.title}>Tag:</Text>
                <View style={styles.tagInput}>
                    <RNPickerSelect
                        onValueChange={(value) => handleInputChange('tagId', value)}
                        items={tagOptions}
                        onOpen={() => setSelectedTag(null)} // Reset selectedTag when picker is opened
                        placeholder={{ label: 'Selecione uma tag', value: null }}
                        hideDoneBar
                    />
                    {selectedTag && <Text>Selected Tag: {selectedTag.label}</Text>}
                </View>
            </View> */}
            <View>
                <Text style={styles.title}>Tag:</Text>
                <View style={styles.tagInput}>
                    <ModalSelector // Substitua o RNPickerSelect pelo react-native-modal-selector
                        data={tagOptions.map((option, index) => ({ key: index, ...option }))}
                        initValue={selectedTag || "Selecione uma tag"} // Use selectedTag ou "Selecione uma tag" como texto inicial
                        onChange={(option) => {
                            handleInputChange('tagId', option.value);
                            setSelectedTag(option.label);
                        }}
                        // Adicione o código abaixo para fechar o modal quando uma tag for selecionada
                        onModalOpen={() => setSelectedTag(null)}
                    />
                </View>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.gptButton}
                    onPress={() => handleGptGenerate(data.summarieName)}
                    // onPress={() => console.log(data.summarieName)}
                >
                    <Text style={styles.textButton}>Generate with ChatGpt</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Summarie Content:</Text>
                <TextInput
                    name="summarieContent"
                    style={styles.inputGrande}
                    value={data.summarieContent}
                    onChangeText={(value) => handleInputChange('summarieContent', value)}
                    multiline={true} />
            </View>


            <View>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleCreateSummarie()}
                >
                    <Text style={styles.textButton}>Add</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 8,
    },
    container: {
        width: 307,
        // height: 360,
        borderRadius: 10,
        marginTop: 250,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#F1F5F6',
        borderColor: '#004257',
        borderWidth: 0.5,
        paddingTop: 20,
        paddingBottom: 60,
        

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
        position: 'relative',
        top: 20,
        bottom: 20,
        justifyContent: 'center'
    },
    gptButton: {
        backgroundColor: '#004257',
        borderRadius: 10,
        height: 32,
        width: 160,
        alignSelf: 'start',
        position: 'relative',
        top: 20,
        bottom: 30,
        justifyContent: 'center',
        marginBottom: 24,
        marginLeft: 33,
    },
    textButton: {
        color: '#DAE9F1',
        alignSelf: 'center'
    },
    title: {
        fontSize: 16,
        marginLeft: 33,
        color: '#004257',
        marginTop: 5
    },
    input: {
        backgroundColor: '#A4C3DA',
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        padding: 2
    },
    inputGrande: {
        backgroundColor: '#A4C3DA',
        minHeight: 100,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        padding: 2,
        textAlignVertical: 'top',
    },
    tagInput: {
        backgroundColor: '#A4C3DA',
        // height: 30,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,

    },
})