import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { globalStyles } from '../../styles/global';
import { useNavigation, useRoute } from '@react-navigation/native';
import { EditSummarie } from '../../hooks/useSummarie';
import { useUser } from '../../hooks/useContextUserId';

export function SummarieEdit() {
    const navigation = useNavigation();
    const route = useRoute();
    const item = route.params?.item;
    const { ip, token } = useUser();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [editedSummarie, setEditedSummarie] = useState({
        summarieName: item.summarie_name,
        summarieContent: item.summarie_content,
    });

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleSaveChanges = async () => {
        try {
            await EditSummarie(item.id, editedSummarie, ip, token);
            navigation.navigate('SummarieOpen', { item });
        } catch (error) {
            console.error('Error occurred while editing summarie: ', error);
        }
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.tittlePage}>{"Edit Summary"}</Text>

            <View style={styles.container}>
                <Text style={styles.label}>Summary Name:</Text>
                <TextInput
                    style={styles.input}
                    value={editedSummarie.summarieName}
                    onChangeText={(value) => setEditedSummarie({ ...editedSummarie, summarieName: value })}
                />

                <Text style={styles.label}>Summary Content:</Text>
                <TextInput
                    style={styles.largeInput}
                    value={editedSummarie.summarieContent}
                    onChangeText={(value) => setEditedSummarie({ ...editedSummarie, summarieContent: value })}
                    multiline
                />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                <Text style={globalStyles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    input: {
        fontSize: 14,
        borderColor: '#004257',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
    },
    largeInput: {
        fontSize: 14,
        borderColor: '#004257',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        minHeight: 200,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#004257',
        borderRadius: 10,
        height: 37,
        width: 132,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
});
