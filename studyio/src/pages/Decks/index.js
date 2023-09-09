import { React, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal, DeviceMotion } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { globalStyles } from '../../styles/global';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ListCards, DeleteCard } from '../../hooks/useCard';
import { CreateCard } from '../../modais/CreateCard';
import { UpdateCard } from '../../modais/UpdateCard';
import { CreateTag } from '../../modais/CreateTag';
import { useUser } from '../../hooks/useContextUserId';
import Toast from 'react-native-toast-message';

export function Decks() {
    const navigation = useNavigation();
    const route = useRoute();
    const item = route.params?.item;
    const [cardList, setCardList] = useState([]);
    const [visibleModalCreateCard, setVisibleModalCreateCard] = useState(false);
    const [visibleModalEditCard, setVisibleModalEditCard] = useState(false);
    const [visibleModalTag, setVisibleModalTag] = useState(false);
    const { userId, ip, token } = useUser();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const toggleShowAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleCreateCardSuccess = () => {
        setVisibleModalCreateCard(false);
        handleListCard();
        Toast.show({
            type: 'success',
            text1: 'Card created successfully!'
        });
    }

    const handleEditCardSuccess = () => {
        setVisibleModalEditCard(false);
        handleListCard();
        Toast.show({
            type: 'success',
            text1: 'Card updated successfully!'
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            handleListCard();
        };

        fetchData();

        if(DeviceMotion){
            console.log('executei');
            DeviceMotion.addListener(({ acceleration }) => {
                const { x, y, z } = acceleration;
        
    
                const shakeThreshold = 1.5; 
    
                if (Math.abs(x) > shakeThreshold || Math.abs(y) > shakeThreshold || Math.abs(z) > shakeThreshold) {
                    setShowAnswer(!showAnswer);
                }
            });
        
            return () => {
                DeviceMotion.removeAllListeners();
            };
        }
       
    }, []);

    async function handleListCard() {
        try {
            await ListCards(item.id, ip, token).then((response) => {
                const data = response.data;
                setCardList(data);
            }).catch((err) => {
                Toast.show({
                    type: 'error',
                    text1: 'Error fetching data', err
                });
            })

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error occurred while list cards', error
            });
        }
    }

    async function handleDeleteCard(cardId) {
        try {
            await DeleteCard(cardId, ip, token).then((response) => {
                Toast.show({
                    type: 'success',
                    text1: 'Card deleted successfully!'
                });
                handleListCard();
            }).catch((err) => {
                Toast.show({
                    type: 'error',
                    text1: 'Error fetching data', err
                });
            })
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error occurred while delete card', error
            });
        }
    }

    const CardItem = ({ item, currentIndex, totalItems }) => {
        return (
            <View style={globalStyles.cardFlahscard}>
                <View style={globalStyles.cardFlahscardContent}>
                    <Text style={globalStyles.cardFlahscardText}>{showAnswer ? item.card_content : item.card_name}</Text>
                </View>
                <Text style={styles.cardNumberText}>
                    {currentIndex + 1}/{totalItems}
                </Text>
                <View style={{ flexDirection: 'row', top: 2, justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                    <TouchableOpacity onPress={() => { setVisibleModalEditCard(true); setSelectedItem(item); }}>
                        <Image
                            source={require('../../assets/edit-2.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteCard(item.id)}>
                        <Image
                            source={require('../../assets/trash.png')}
                        />
                    </TouchableOpacity>
                </View>
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
            <Carousel
            data={cardList}
            renderItem={({ item, index }) => <CardItem item={item} 
            currentIndex={index} 
            totalItems={cardList.length}/>}
            sliderWidth={300}
            itemWidth={280}
            onSnapToItem={(index) => setCurrentIndex(index)}
            />
            <Modal
                visible={visibleModalCreateCard}
                transparent={true}
                onRequestClose={() => setVisibleModalCreateCard(false)}
                data={userId}>
                <CreateCard
                    handleClose={handleCreateCardSuccess}
                    selectedItem={selectedItem} />
            </Modal>
            <Modal
                visible={visibleModalTag}
                transparent={true}
                onRequestClose={() => setVisibleModalTag(false)}
                data={userId}>
                <CreateTag
                    handleClose={() => setVisibleModalTag(false)} />
            </Modal>
            <Modal
                visible={visibleModalEditCard}
                transparent={true}
                onRequestClose={() => {
                    setVisibleModalEditCard(false);
                    handleListDeck();
                    }}>
                <UpdateCard
                    handleClose={handleEditCardSuccess}
                    selectedItem={selectedItem} />
            </Modal>
            {isMenuOpen && (
                <TouchableOpacity style={globalStyles.subButton1} onPress={() => { setVisibleModalCreateCard(true); setSelectedItem(item);} }>
                    <Image
                        source={require('../../assets/file.png')}
                    />
                </TouchableOpacity>
            )}
            {isMenuOpen && (
                <TouchableOpacity style={globalStyles.subButton2} onPress={() => setVisibleModalTag(true)}>
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
                onPress={toggleShowAnswer}>
                <Text style={styles.textButton}>
                    {showAnswer ? "Hide Answer" : "Show Answer"}
                </Text>
            </TouchableOpacity>
            <Toast />
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
    cardNumberText: {
        fontSize: 16,
        color: '#004257',
        alignSelf: 'center',
        marginTop: 8,
    },
})
