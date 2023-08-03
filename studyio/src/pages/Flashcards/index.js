import { React, useState, useEffect } from 'react';
import { SafeAreaView, Text, Image, StyleSheet, TouchableOpacity, FlatList, View, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { globalStyles } from '../../styles/global';
import { CreateDeck } from '../../modais/CreateDeck';
import { CreateTag } from '../../modais/CreateTag';

export function Flashcards() {
    const navigation = useNavigation();
    const [deckList, setDeckList] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModal2, setVisibleModal2] = useState(false);
    const route = useRoute();
    const { userId } = route.params;
    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://192.168.1.114:3000/decks/list/${userId}`);
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
            <Text style={globalStyles.tittlePage}>Decks:</Text>
            <FlatList
                data={deckList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <Modal
                visible={visibleModal}
                transparent={true}
                onRequestClose={ () => setVisibleModal(false) }>
                <CreateDeck
                handleClose={ () => setVisibleModal(false)}/>
            </Modal>
            <Modal
                visible={visibleModal2}
                transparent={true}
                onRequestClose={() => setVisibleModal2(false)}
                data={userId}>
                <CreateTag
                handleClose={ () => setVisibleModal2(false)}/>
            </Modal>
            {isMenuOpen && (
                <TouchableOpacity style={globalStyles.subButton1} onPress={() => setVisibleModal(true)}>
                <Image
                    source={require('../../assets/layers.png')}
                    style={styles.subButtonImage}
                />
                </TouchableOpacity>
            )}
            {isMenuOpen && (
                <TouchableOpacity style={globalStyles.subButton2} onPress={() => setVisibleModal2(true)}>
                <Image
                    source={require('../../assets/tag.png')}
                    style={styles.subButtonImage}
                />
                </TouchableOpacity>
            )}
            <TouchableOpacity style={globalStyles.floatingButton} onPress={toggleMenu}>
                <Text style={globalStyles.buttonText}>{isMenuOpen ? "-" : "+"}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create ({
    banana:{
        fontSize: 12,
        color: '#004257',
        textAlign: 'right'
    },
    button:{
        justifyContent: 'center',
        backgroundColor: '#004257',
        borderRadius: 10,
        width: 132,
        height: 37,
        alignSelf: 'center',
        alignItems: 'center',
        bottom: '10%',
        marginTop: 270
    },
})