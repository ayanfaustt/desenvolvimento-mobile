import { React, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { globalStyles } from '../../styles/global';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OpenCard } from '../../hooks/useCard';
import { useUser } from '../../hooks/useContextUserId';

export function Cards() {
    const route = useRoute();
    const item = route.params?.item;
    const [openCard, setOpenCard] = useState([]);
    const { ip } = useUser();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await OpenCard(item.id, ip).then((response) => {
                    const data = response.data;
                    console.log(data)
                    setOpenCard(data);
                }).catch((err) => {
                    console.log('Error fetching data:', err);
                })

            } catch (error) {
                console.error('Error occurred while open card: ', error);
            }
        };

        fetchData();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={globalStyles.card} onPress={() => handleOpenCard(item)}>
            <View style={globalStyles.cardContent}>
                <Text style={globalStyles.cardText}>{item.card_name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.tittlePage}>Deck Name</Text>
            <View style={globalStyles.tag}>
                <Text style={globalStyles.tagText}>Tag Name</Text>
                <Text style={globalStyles.tagLine}></Text>
            </View>
            <FlatList
                data={openCard}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
        
    )
}
