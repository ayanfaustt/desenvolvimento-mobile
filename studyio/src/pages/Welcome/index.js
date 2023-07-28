import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppIntroSlider } from 'react-native-app-intro-slider';
import { globalStyles } from '../../styles/global';

export function Welcome() {
    const navigation = useNavigation();

    function renderSlides({ item }){
        return(
            <View style={{flex:2}}>
                <Image
                source={item.image}/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={{ width: '100%', marginTop: 58 }}
                resizeMode='contain'
            />

            {/* <AppIntroSlider
                renderItem={renderSlides}
                data={slides}
                activeDotStyle={{
                    width: 30 
                }}
            /> */}

            <TouchableOpacity 
            style={globalStyles.button}
            onPress={ () => navigation.navigate('SingIn')}>
                <Text style={globalStyles.textButton}>Login</Text>
            </TouchableOpacity>
            
            <TouchableOpacity>
                <Text style={globalStyles.textClick}
                onPress={ () => navigation.navigate('SingUp')}>New? Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F1F5F6',
    }
});


const slides = [
    {
        key: 'dashboards',
        title: 'Dashboards',
        text: 'Follow your development!',
        image: require('../../assets/Dashboard.png')
    },
    {
        key: 'flashcards',
        title: 'Flashcards',
        text: 'Follow your development!',
        image: require('../../assets/Flashcards.png')
    },
    {
        key: 'summaries',
        title: 'Summaries',
        text: 'Follow your development!',
        image: require('../../assets/Summaries.png')
    },
    {
        key: 'studymaterial',
        title: 'Study Material',
        text: 'Follow your development!',
        image: require('../../assets/Studymaterial.png')
    }
]

