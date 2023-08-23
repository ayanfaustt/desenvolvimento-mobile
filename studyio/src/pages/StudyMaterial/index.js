import React, { useState } from 'react';
import { globalStyles } from '../../styles/global';
import {
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    TextInput,
} from 'react-native';

export function StudyMaterial() {
    const [textInput, setTextInput] = useState('');
    const [underlineGenerate, setUnderlineGenerated] = useState(true);
    const [underlineFavorite, setUnderlineFavorite] = useState(false);


    const handleGptGenerate = () => {
        console.log('aq')
    };

    const handleFavorite = () => {
        setUnderlineFavorite(true);
        setUnderlineGenerated(false);
    };
    
    const handleGenerate = () => {
        setUnderlineGenerated(true);
        setUnderlineFavorite(false);
    };

    return (
        <View style={globalStyles.container}>
        <View style={styles.header}>
            <Text style={globalStyles.tittlePage}>Study Material</Text>
        </View>
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder="Generate with AI..."
                value={textInput}
                onChangeText={(text) => setTextInput(text)}
            />
            <TouchableOpacity style={styles.gptButton} onPress={handleGptGenerate} >
                <Image
                    source={require('../../assets/gpt-icon.png')}
                />
            </TouchableOpacity>
        </View>
        <View style={styles.generateFavorite}>
            <TouchableOpacity onPress={handleGenerate}>
                <Text style={[styles.generateFavoriteText, underlineGenerate && styles.underline]}>Generate</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.favorite} onPress={handleFavorite}>
                <Text style={[styles.generateFavoriteText, underlineFavorite && styles.underline]}>Favorites</Text>
                <Image
                    source={require('../../assets/star.png')}
                />
            </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,

    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        padding: 8,
        marginBottom: 8,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#004257',
        borderRadius: 24,
        paddingLeft: 8,
        paddingVertical: 4,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: '#DAE9F1'
        // fontfamily: 'Montserrat',
    },
    gptButton: {
        padding: 10,
    },
    generateFavorite: {
        flexDirection: 'row',
        gap: 8,
        paddingLeft: 10,
    },
    generateFavoriteText: {
        color: '#004257',
    },
    favorite: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4
    },
    underline: {
        borderBottomWidth: 2,
        textDecorationColor: '#004257',
    }
});
