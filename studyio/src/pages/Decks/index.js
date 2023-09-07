import { React, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { globalStyles } from '../../styles/global';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ListCards } from '../../hooks/useCard';
import { CreateDeck } from '../../modais/CreateDeck';
import { CreateTag } from '../../modais/CreateTag';
import { useUser } from '../../hooks/useContextUserId';

export function Decks() {
    const navigation = useNavigation();
    const route = useRoute();
    const item = route.params?.item;
    const [cardList, setCardList] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModal2, setVisibleModal2] = useState(false);
    const { userId, ip, token } = useUser();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            handleListCard();
        };

        fetchData();
    }, []);

    async function handleListCard() {
        try {
            await ListCards(item.id, ip, token).then((response) => {
                const data = response.data;
                setCardList(data);
            }).catch((err) => {
                console.log('Error fetching data:', err);
            })

        } catch (error) {
            console.error('Error occurred while list decks: ', error);
        }
    }

    async function handleOpenCard(item) {
        navigation.navigate('Cards', {item});
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={globalStyles.cardFlahscard} onPress={() => handleOpenCard(item)}>
            <View style={globalStyles.cardFlahscardContent}>
                <Text style={globalStyles.cardFlahscardText}>{item.card_name}</Text>
            </View>
        </TouchableOpacity>
    );

    const CardItem = ({ item }) => {
        return (
          <View style={styles.cardContainer}>
            <Text style={styles.cardText}>{item.card_name}</Text>
          </View>
        );
      };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.tittlePage}>{item.deck_name}</Text>
            <View style={globalStyles.tag}>
                <Text style={globalStyles.tagText}>{item.tag.tag_name}</Text>
                <Text style={globalStyles.tagLine}></Text>
            </View>
            {/* <FlatList
                data={cardList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            /> */}
            <Carousel
            data={cardList}
            renderItem={({ item }) => <CardItem item={item} />}
            sliderWidth={300}
            itemWidth={200}
            />
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
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleLogin()}>
                <Text style={styles.textButton}>Show Answer</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: '#004257',
        borderRadius: 10,
        width: 165,
        height: 37,
        alignSelf: 'center',
        alignItems: 'center',
        bottom: '5%'

    },
    textButton: {
        fontSize: 20,
        color: '#DAE9F1',
        alignItems: 'center'
    },
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
      cardText: {
        fontSize: 18,
    },
})
