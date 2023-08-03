import { React, useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, FlatList, View, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../styles/global';
import { CreateDeck } from '../../modais/CreateDeck';

export function Flashcards() {
    const navigation = useNavigation();
    const [deckList, setDeckList] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://192.168.0.109:3000/decks/list/${33}`);
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
            <Text style={globalStyles.cardText2}>{item.tagId}</Text>
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
                onRequestClose={ () => setVisibleModal(false) }>
                <CreateDeck
                handleClose={ () => setVisibleModal(false) }/>
            </Modal>
            <TouchableOpacity style={globalStyles.floatingButton} onPress={ () => setVisibleModal(true)}>
                <Text style={globalStyles.buttonText}>+</Text>
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
    }
})