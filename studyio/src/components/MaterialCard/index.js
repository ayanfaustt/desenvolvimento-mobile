import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import {AutoSizeText} from 'react-native-auto-size-text';
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialModal from '../../modais/MaterialModal';

function MaterialCard ({ data,  isFavoriteTrue, deleteFavorite, createFavorite }) {
  const [isFavorite, setIsfavorite] = useState(isFavoriteTrue);
  const [isVisible, setIsVisible] =  useState(false);

  const closeModal = () => {
    setIsVisible(!isVisible);
  };

  const favorite = async (favoriteData) => {
    setIsfavorite(!isFavorite);
    console.log(favoriteData);
    await createFavorite(favoriteData);
  };

  const unFavorite = async (favoriteData) => {
    setIsfavorite(!isFavorite);
    await deleteFavorite(favoriteData);
    
  };

  return (
    <TouchableOpacity  style={styles.card} onPress={() => setIsVisible(!isVisible)}>
      <SafeAreaView style={styles.row}>
        <View style={styles.cardBorder}>
          <AutoSizeText
           style={styles.title} 
           minFontSize={10}
           maxFontSize={16}
          >
            {data.name}
          </AutoSizeText>
          <Text style={styles.author}>{data.type}</Text>
        </View>
        <TouchableOpacity onPress={() => isFavorite ? unFavorite(data) : favorite(data)}>
          <View style={styles.star}>
            {isFavorite ? (
              <Icon name='star' size={30} color='#024959'/>
            ) : (
              <Icon name='star-outline' size={30} color='#024959'/>
            )}
          </View>
        </TouchableOpacity>
      </SafeAreaView>
      <MaterialModal data={data} visible={isVisible} closeModal={closeModal}></MaterialModal>
    </TouchableOpacity >
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#A7C6D9',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardBorder: {
    display: "flex",
    flexDirection: 'column',
    width:'80%'
  },
  row: {
    backgroundColor: '#A7C6D9',
    borderStyle:"solid",
    borderWidth: 1,
    borderRadius: 8,
    borderColor:"#3F7E8C",
    padding: 10,
    display:"flex",
    flexDirection: "row",
    gap:20
    
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  star: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'transparent',
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starText: {
    fontSize: 20,
    color: '#024959',
  },
});

export default MaterialCard;
