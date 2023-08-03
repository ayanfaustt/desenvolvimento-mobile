import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    View,
    Modal,
    TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { globalStyles } from '../../styles/global';
import { CreateDeck } from '../../modais/CreateDeck';
import { CreateTag } from '../../modais/CreateTag';

export function StudyMaterial() {
    const navigation = useNavigation();
    const [deckList, setDeckList] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModal2, setVisibleModal2] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://192.168.100.5:8000/decks/list/14`);
                if (response.ok) {
                    const data = await response.json();
                    setDeckList(data);
                } else {
                    console.error('Error fetching data:', response.status);
                }
            } catch (error) {
                console.error('Error occurred while list decks: ', error);
            }
        };

        fetchData();
    }, []);

    async function handleOpenDeck() {
        navigation.navigate('Decks');
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={globalStyles.card} onPress={() => handleOpenDeck()}>
            <View style={globalStyles.cardContent}>
                <Text style={globalStyles.cardText}>{item.deck_name}</Text>
                <Text style={globalStyles.cardText2}>{item.tag.tag_name}</Text>
            </View>
        </TouchableOpacity>
    );
    return (
        <View style={globalStyles.container}>
            <View style={styles.header}>
                <Text style={globalStyles.tittlePage}>Study Material</Text>
            </View>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="generate with AI"
                    // Implemente a lógica da barra de pesquisa aqui
                    />
                    <TouchableOpacity style={styles.gptButton}>
                        
                    </TouchableOpacity>
                </View>

            {/* Restante do código igual... */}
        </View>
    );
}

const styles = StyleSheet.create({
    // Restante do código igual...

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    gptButton: {
        padding: 10,
    },
    gptIcon: {
        width: 24,
        height: 24,
        tintColor: '#004257',
    },
});
