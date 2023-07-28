import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { globalStyles } from '../../styles/global';
import { useNavigation } from '@react-navigation/native';

export function Temporary() {
    const navigation = useNavigation();

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.tittlePage}>Tela temporária pra navegação</Text>
            <Image
                source={require('../../assets/sorry.png')}
                style={{width: 80, height: 80, alignSelf: 'center'}}
                resizeMode='contain'
            />
            <Text style={{alignSelf: 'center', margin: 20}}
            >Desculpe pela burrice</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={ () => navigation.navigate('Flashcards')}>
                    <Text style={globalStyles.textButton}>Flashcards</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={ () => navigation.navigate('Summaries')}>
                    <Text style={globalStyles.textButton}>Summaries</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={ () => navigation.navigate('Dashboard')}>
                    <Text style={globalStyles.textButton}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={ () => navigation.navigate('StudyMaterial')}>
                    <Text style={globalStyles.textButton}>Study Material</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={ () => navigation.navigate('Account')}>
                    <Text style={globalStyles.textButton}>Account</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create ({
    button:{
        justifyContent: 'center',
        backgroundColor: '#004257',
        alignSelf: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 10
        
    },
    textTittle:{
        fontSize: 50,
        justifyContent: 'center',
        marginBottom: 50
    }
})