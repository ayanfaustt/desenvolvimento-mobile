import { React, useState, useEffect } from 'react';
import { SafeAreaView, Text, Image, StyleSheet, TouchableOpacity, FlatList, View, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { globalStyles } from '../../styles/global';
import { CreateDeck } from '../../modais/CreateDeck';
import { UpdateDeck } from '../../modais/UpdateDeck';
import { CreateTag } from '../../modais/CreateTag';
import { ListDecks, DeleteDeck } from '../../hooks/useDeck';
import { useUser } from '../../hooks/useContextUserId';
import { Decks } from '../Decks';
import Toast from 'react-native-toast-message';

export function Flashcards() {
    const navigation = useNavigation();
    const [deckList, setDeckList] = useState([]);
    const [visibleModalCreateDeck, setVisibleModalCreateDeck] = useState(false);
    const [visibleModalEditDeck, setVisibleModalEditDeck] = useState(false);
    const [visibleModalCreateTag, setVisibleModalCreateTag] = useState(false);
    const { userId, ip, token } = useUser();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    const handleCreateDeckSuccess = () => {
        setVisibleModalCreateDeck(false);
        handleListDeck();
        Toast.show({
            type: 'success',
            text1: 'Deck created successfully!'
        });
    }

    const handleEditDeckSuccess = () => {
        setVisibleModalEditDeck(false);
        handleListDeck();
        Toast.show({
            type: 'success',
            text1: 'Deck updated successfully!'
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
                Toast.show({
                    type: 'error',
                    text1: 'Error fetching data', err
                });
            })

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error occurred while list decks', error
            });
        }
    }

    async function handleOpenDeck(item) {
        navigation.navigate('SubPageStack', { screen: 'Decks', params: { item } });
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
                Toast.show({
                    type: 'error',
                    text1: 'Error fetching data', err
                });
            })
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error occurred while delete deck', error
            });
        }
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={globalStyles.card} onPress={() => handleOpenDeck(item)}>
            <View style={globalStyles.cardContent}>
                <Text style={globalStyles.cardText}>{item.deck_name}</Text>
                <Text style={globalStyles.cardText2}>{item.tag.tag_name}</Text>
                <View style={{ flexDirection: 'column', alignItems: 'flex-end', bottom: 45 }}>
                    <TouchableOpacity style={{marginBottom: 12}} onPress={() => { setVisibleModalEditDeck(true); setSelectedItem(item); }}>
                        <Image
                            source={require('../../assets/edit-2.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 12}} onPress={() => handleDeleteDeck(item.id)}>
                        <Image
                            source={require('../../assets/trash.png')}
                        />
                    </TouchableOpacity>
                </View>
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
                visible={visibleModalCreateDeck}
                transparent={true}
                onRequestClose={() => {
                    setVisibleModalCreateDeck(false);
                    handleListDeck();
                    }}>
                <CreateDeck
                    handleClose={handleCreateDeckSuccess} />
            </Modal>
            <Modal
                visible={visibleModalEditDeck}
                transparent={true}
                onRequestClose={() => {
                    setVisibleModalEditDeck(false);
                    handleListDeck();
                    }}>
                <UpdateDeck
                    handleClose={handleEditDeckSuccess}
                    selectedItem={selectedItem} />
            </Modal>
            <Modal
                visible={visibleModalCreateTag}
                transparent={true}
                onRequestClose={() => setVisibleModalCreateTag(false)}
                data={userId}>
                <CreateTag
                    handleClose={() => setVisibleModalCreateTag(false)} />
            </Modal>
            {isMenuOpen && (
                <TouchableOpacity style={globalStyles.subButton1} onPress={() => setVisibleModalCreateDeck(true)}>
                    <Image
                        source={require('../../assets/layers.png')}
                    />
                </TouchableOpacity>
            )}
            {isMenuOpen && (
                <TouchableOpacity style={globalStyles.subButton2} onPress={() => setVisibleModalCreateTag(true)}>
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

