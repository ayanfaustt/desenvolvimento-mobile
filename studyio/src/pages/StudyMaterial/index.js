import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../hooks/useContextUserId';
import { useNavigation, useRoute } from '@react-navigation/native';
import { globalStyles } from '../../styles/global';
import {
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    TextInput,
    FlatList,
    ActivityIndicator,
    SafeAreaView
} from 'react-native';
import MaterialCard from '../../components/MaterialCard';
import Toast from 'react-native-toast-message';
import MaterialModal from '../../modais/MaterialModal';

export function StudyMaterial() {
    const [textInput, setTextInput] = useState('');
    const { userId, ip, token } = useUser();
    const [underlineGenerate, setUnderlineGenerated] = useState(true);
    const [underlineFavorite, setUnderlineFavorite] = useState(false);
    const [favorite, setFavorite] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    const handleGptGenerate = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${ip}/openai/create/materials`,
                {
                    material: textInput
                },
                config
            );

            if(!response)
                throw new Error("Request faild");
            
            setMaterials(response.data.response.respects);
            console.log(materials);
            setIsLoading(false);
        } catch (error) {
            Toast.show({
                type: "error",
                text1: error
            });
            setIsLoading(false);
        }
    };

    useEffect(() => {
        listFavorites();
    }, []);

    const handleFavorite = () => {
        setUnderlineFavorite(!underlineFavorite);
        setUnderlineGenerated(!underlineGenerate);
    };
    
    const handleGenerate = () => {
        setUnderlineGenerated(!underlineGenerate);
        setUnderlineFavorite(!underlineFavorite);
    };

    const listFavorites = async (userId) =>{
        try {
            setIsLoading(true);
            const response = await axios.get(
                `${ip}/openai/favorite/list/${userId}`,
                config
            );
            
            setFavorite(response.data);
            console.log(favorite);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const createFavorite = async ({name, type, author, description}) => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${ip}/openai/favorite/create`,
                {
                    favorite: {
                        name: name,
                        type: type,
                        author: author,
                        description: description,
                        userId: userId
                    },
                },
                config
            );
    
            setFavorite(materials);
            setMaterials((pList) => pList.filter(x => x.name !== name))
            setIsLoading(false);        
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }   
    
    };

    const deleteFavorite = async (favoriteData) => {
        setIsLoading(true);
        const response = await axios.delete(`${ip}/openai/favorite/delete/${favoriteData.id}`, config);
        setFavorite((pList) => pList.filter(x => x.id !== favoriteData.id));
        setIsLoading(false);
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.header}>
                <Text style={globalStyles.tittlePage}>Study Material</Text>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Generate with AI..."
                    value={textInput}
                    onChangeText={(text) => setTextInput(text)}
                />
                <TouchableOpacity style={styles.gptButton} onPress={handleGptGenerate} >
                    <Image
                        source={require('../../assets/gpt-icon.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.generateFavorite}>
                <TouchableOpacity onPress={handleGenerate}>
                    <Text style={[styles.generateFavoriteText, underlineGenerate && styles.underline]}>Generate</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.favorite} onPress={() => {
                    listFavorites(userId);
                    handleFavorite();
                    
                }}>
                    <Text style={[styles.generateFavoriteText, underlineFavorite && styles.underline]}>Favorites</Text>
                    <Image
                        source={require('../../assets/star.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
                {
                    isLoading && underlineGenerate?
                    <ActivityIndicator size="large" color={'#004257'}/>
                    :
                    underlineGenerate
                    &&
                    <FlatList
                        data={materials}
                        keyExtractor={(item) => item.name.toString()}
                        renderItem={
                            ({item}) => {
                                return(
                                    <MaterialCard
                                        data={item}
                                        isFavoriteTrue={false}
                                        createFavorite={createFavorite}
                                    ></MaterialCard>
                                );
                            }
                        }
                    >
                    </FlatList>
                }
                {
                    isLoading && underlineFavorite?
                    <ActivityIndicator size="large" color={'#004257'}/>
                    :
                    underlineFavorite 
                    && 
                    <FlatList
                    data={favorite} 
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => 
                        <MaterialCard 
                            data={item} 
                            isFavoriteTrue={true} 
                            deleteFavorite={deleteFavorite}
                        />
                    }
                    ></FlatList>
                }
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,

    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        padding: 8,
        marginBottom: 8,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#004257',
        borderRadius: 24,
        paddingLeft: 8,
        paddingVertical: 4,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: '#DAE9F1'
        // fontfamily: 'Montserrat',
    },
    gptButton: {
        padding: 10,
    },
    generateFavorite: {
        flexDirection: 'row',
        gap: 8,
        paddingLeft: 10,
    },
    generateFavoriteText: {
        color: '#004257',
    },
    favorite: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4
    },
    underline: {
        borderBottomWidth: 2,
        textDecorationColor: '#004257',
    }
});
