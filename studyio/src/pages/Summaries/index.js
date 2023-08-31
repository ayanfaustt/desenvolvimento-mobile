import { React, useState, useEffect } from 'react';
import { SafeAreaView, Text, Image, StyleSheet, TouchableOpacity, FlatList, View, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { globalStyles } from '../../styles/global';
import { CreateSummarie } from '../../modais/CreateSummarie';
import { CreateTag } from '../../modais/CreateTag';
import { ListSummaries, DeleteSummarie } from '../../hooks/useSummarie';
import { useUser } from '../../hooks/useContextUserId';
import Toast from 'react-native-toast-message';

export function Summaries() {
    const navigation = useNavigation();
    const [summarieList, setSummarieList] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModal2, setVisibleModal2] = useState(false);
    const { userId, ip, token } = useUser();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            handleListSummarie();
        };

        fetchData();
    }, []);

    async function handleListSummarie() {
        try {
            await ListSummaries(userId, ip, token).then((res) => {
                setSummarieList(res.data);
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
        } catch (error) {
            console.error('Error occurred while list summaries: ', error);
        };
    };

    async function handleOpenSummarie(item) {
        navigation.navigate('SummarieOpen', {item});
    };

    async function handleDeleteSummarie(summarieId) {
        try {
            await DeleteSummarie(summarieId, ip, token).then((response) => {
                Toast.show({
                    type: 'success',
                    text1: 'Deck deleted successfully!'
                });
                handleListSummarie();
            }).catch((err) => {
                console.log('deu errado')
                console.log('Error fetching data:', err);
            })
        } catch (error) {
            console.error('Error occurred while delete deck: ', error);
        }
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={globalStyles.card} onPress={() => handleOpenSummarie(item)}>
            <View style={globalStyles.cardContent}>
                <Text style={globalStyles.cardText}>{item.summarie_name}</Text>
                <Text style={globalStyles.cardText2}>{item.tag.tag_name}</Text>
                <TouchableOpacity style={{justifyContent: 'center', alignItems: 'flex-end'}} onPress={() => handleDeleteSummarie(item.id)}>
                    <Image
                        source={require('../../assets/trash.png')}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.tittlePage}>Sumaries:</Text>
            <FlatList
                data={summarieList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <Modal
                visible={visibleModal}
                transparent={true}
                onRequestClose={() => setVisibleModal(false)}>
                <CreateSummarie
                    handleClose={() => {
                        setVisibleModal(false);
                        handleListSummarie();
                        
                        }} />
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
                        source={require('../../assets/lista-da-area-de-transferencia.png')}
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

const styles = StyleSheet.create({
    banana: {
        fontSize: 12,
        color: '#004257',
        textAlign: 'right'
    },
    button: {
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