import { React, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { globalStyles } from '../../styles/global';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';


export function SummarieOpen() {
    const navigation = useNavigation();
    const route = useRoute();
    const item = route.params?.item;
    const isFocused = useIsFocused();

    console.log(item);

    const [currentItem, setCurrentItem] = useState(item);
    
    useEffect(() => {
        if (isFocused) {
            setCurrentItem(item);
        }
    }, [isFocused, item]);

    

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