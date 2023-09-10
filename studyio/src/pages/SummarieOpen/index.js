import { React, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { globalStyles } from '../../styles/global';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { useUser } from '../../hooks/useContextUserId';
import { ListOneSummarie } from '../../hooks/useSummarie';
import Toast from 'react-native-toast-message';


export function SummarieOpen() {
    const navigation = useNavigation();
    const route = useRoute();
    const summarieId = route.params?.item.id;
    const item = route.params?.item;
    const { userId, ip, token, reqConfig } = useUser();

    // console.log(item);

    const [currentItem, setCurrentItem] = useState(item);
    
    const handleListOneSummarie = async () => {
        try {
            const response = await ListOneSummarie(summarieId, ip, token);
            setCurrentItem(response.data);
            // console.log(currentItem);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const updatedMetrics = async () =>{
        try {
            await axios.post(
                `${ip}/metrics/update/summaries/${userId}`,
                {},
                reqConfig
            );
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: `${error}`
            })
        }
    }; 
    useEffect(() => {  
        updatedMetrics();
    });

    useFocusEffect(() => {
        handleListOneSummarie();
    });


    

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.tittlePage}>{"Summary"}</Text>
            {/* <View style={globalStyles.tag}>
                <Text style={globalStyles.tagText}>{item.tag.tag_name}</Text>
                <Text style={globalStyles.tagLine}></Text>
            </View> */}

            <View style={styles.container}>
                <Text style={styles.title}>{currentItem.summarie_name}</Text>
                <Text style={styles.content}>{currentItem.summarie_content}</Text>
            </View>

            <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('SummarieEdit', { item })}>
                <Image
                    source={require('../../assets/edit-2.png')}
                />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        fontSize: 14,
        marginTop: 10,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: -20,
        // backgroundColor: '#004257',
        backgroundColor: '#f1f1f1f1',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
});