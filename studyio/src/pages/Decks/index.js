import { React, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { globalStyles } from '../../styles/global';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ListCards } from '../../hooks/useCard';
import { useUser } from '../../hooks/useContextUserId';

export function Decks() {
    const navigation = useNavigation();
    const route = useRoute();
    const item = route.params?.item;
    const [cardList, setCardList] = useState([]);
    const { ip } = useUser();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await ListCards(item.id, ip).then((response) => {
                    const data = response.data;
                    setCardList(data);
                }).catch((err) => {
                    console.log('Error fetching data:', err);
                })

            } catch (error) {
                console.error('Error occurred while list cards: ', error);
            }
        };

        fetchData();
    }, []);

    async function handleOpenCard(item) {
        navigation.navigate('Cards', {item});
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={globalStyles.card} onPress={() => handleOpenCard(item)}>
            <View style={globalStyles.cardContent}>
                <Text style={globalStyles.cardText3}>{item.card_name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.tittlePage}>{item.deck_name}</Text>
            <View style={globalStyles.tag}>
                <Text style={globalStyles.tagText}>{item.tag.tag_name}</Text>
                <Text style={globalStyles.tagLine}></Text>
            </View>

            <FlatList
                data={cardList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            {isMenuOpen && (
                <TouchableOpacity style={globalStyles.subButton1} onPress={() => setVisibleModal(true)}>
                    <Image
                        source={require('../../assets/file.png')}
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
        </View>
    )
}
