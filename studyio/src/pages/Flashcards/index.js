import { React, useState, useEffect } from 'react';
import { SafeAreaView, Text, Image, StyleSheet, TouchableOpacity, FlatList, View, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { globalStyles } from '../../styles/global';
import { CreateDeck } from '../../modais/CreateDeck';
import { CreateTag } from '../../modais/CreateTag';
import { ListDecks, DeleteDeck } from '../../hooks/useDeck';
import { useUser } from '../../hooks/useContextUserId';
import Toast from 'react-native-toast-message';

export function Flashcards() {
    const navigation = useNavigation();
    const [deckList, setDeckList] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModal2, setVisibleModal2] = useState(false);
    const { userId, ip, token } = useUser();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    const handleCreateDeckSuccess = () => {
        setVisibleModal(false);
        handleListDeck();
        Toast.show({
            type: 'success',
            text1: 'Deck created successfully!'
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            handleListDeck();
        };

        fetchData();
    }, []);

    async function handleListDeck() {
        try {
            await ListDecks(userId, ip, token).then((response) => {
                const data = response.data;
                setDeckList(data);
            }).catch((err) => {
                console.log('Error fetching data:', err);
            })

        } catch (error) {
            console.error('Error occurred while list decks: ', error);
        }
    }

    async function handleOpenDeck(item) {
        navigation.navigate('Decks', {item});
    }

    async function handleDeleteDeck(deckId) {
        try {
            await DeleteDeck(deckId, ip, token).then((response) => {
                Toast.show({
                    type: 'success',
                    text1: 'Deck deleted successfully!'
                });
                handleListDeck();
            }).catch((err) => {
                console.log('deu errado')
                console.log('Error fetching data:', err);
            })
        } catch (error) {
            console.error('Error occurred while delete deck: ', error);
        }
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={globalStyles.card} onPress={() => handleOpenDeck(item)}>
            <View style={globalStyles.cardContent}>
                <Text style={globalStyles.cardText}>{item.deck_name}</Text>
                <Text style={globalStyles.cardText2}>{item.tag.tag_name}</Text>
                <TouchableOpacity style={{justifyContent: 'center', alignItems: 'flex-end'}} onPress={() => handleDeleteDeck(item.id)}>
                    <Image
                        source={require('../../assets/trash.png')}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.tittlePage}>Decks</Text>
            <FlatList
                data={deckList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <Modal
                visible={visibleModal}
                transparent={true}
                onRequestClose={() => {
                    setVisibleModal(false);
                    handleListDeck();
                    }}>
                <CreateDeck
                    handleClose={handleCreateDeckSuccess} />
            </Modal>
            <Modal
                visible={visibleModal2}
                transparent={true}
                onRequestClose={() => setVisibleModal2(false)}
                data={userId}>
                <CreateTag
                    handleClose={() => setVisibleModal2(false)} />
            </Modal>
            {isMenuOpen && (
                <TouchableOpacity style={globalStyles.subButton1} onPress={() => setVisibleModal(true)}>
                    <Image
                        source={require('../../assets/layers.png')}
                    />
                </TouchableOpacity>
            )}
            {isMenuOpen && (
                <TouchableOpacity style={globalStyles.subButton2} onPress={() => setVisibleModal2(true)}>
                    <Image
                        source={require('../../assets/tag.png')}
                    />
                </TouchableOpacity>
            )}
            <TouchableOpacity style={globalStyles.floatingButton} onPress={toggleMenu}>
                <Text style={globalStyles.buttonText}>+</Text>
            </TouchableOpacity>
        <Toast />
        </View>
    )
}

