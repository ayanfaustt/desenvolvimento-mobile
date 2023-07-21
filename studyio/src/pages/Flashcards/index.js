import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/global';
import { AntDesign, Entypo } from 'react-native-vector-icons';

export default function Flashcards() {

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.tittlePage}>Decks</Text>
            <Text style={styles.banana}>Filter</Text>
            {/* <AntDesign name="plus"/> */}
            <TouchableOpacity style={globalStyles.card}>
                <View style={globalStyles.cardContent}>
                    <Text style={globalStyles.cardText}>Camadas de Rede</Text>
                    <Text style={globalStyles.cardText2}>Faculdade</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.card}>
                <View style={globalStyles.cardContent}>
                    <Text style={globalStyles.cardText}>Personal pronouns</Text>
                    <Text style={globalStyles.cardText2}>Ingles</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.card}>
                <View style={globalStyles.cardContent}>
                    <Text style={globalStyles.cardText}>Logica de progração</Text>
                    <Text style={globalStyles.cardText2}>Programação</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}>
                    <Text style={globalStyles.textButton}>Add</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create ({
    banana:{
        fontSize: 12,
        color: '#004257',
        textAlign: 'right'
    },
    button:{
        justifyContent: 'center',
        backgroundColor: '#004257',
        borderRadius: 10,
        width: 132,
        height: 37,
        alignSelf: 'center',
        alignItems: 'center',
        bottom: '10%',
        marginTop: 270
    }
})