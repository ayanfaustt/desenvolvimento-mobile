import {React, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image, SafeAreaView } from "react-native";
import { globalStyles } from '../../styles/global';

export function Changeiconmodal({ handleIconChange, handleClose }) {

    const [selectedIcon, setSelectedIcon] = useState(null);

    const handleIconSelect = (iconName) => {
        setSelectedIcon(iconName);
    };

    const handleSave = () => {
        if (selectedIcon) {
            handleIconChange(selectedIcon);
            handleClose();
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <View>
                <View style={styles.header}>

                    <View style={styles.changeiconHeader}>
                        <Text style={globalStyles.textButton}>Change icon</Text>
                    </View>

                    <TouchableOpacity onPress={handleClose}>
                        <Image 
                        source={require('../../assets/x.png')}
                        style={{ position: 'absolute', left: 40, top: -130}}
                        resizeMode='contain'/>
                    </TouchableOpacity>

                </View>

                <View style={{alignSelf: 'center', alignItems: 'center', height: '5%', bottom: '150%'}}>
                    
                    <View style={{flexDirection: 'row'}}>

                        <TouchableOpacity onPress={() => handleIconSelect('profile-icon01.png')}>
                            <View style={{ position: 'relative'}}>
                                <Image source={require('../../assets/miniprof-icon/profile-icon01.png')}
                                style={[styles.iconImage, selectedIcon === 'profile-icon01.png' && styles.selectedIcon]}/>
                                {selectedIcon === 'profile-icon01.png' && (
                                <Image
                                    source={require('../../assets/check-circle.png')}
                                    style={styles.selectionImage}/>)}
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleIconSelect('profile-icon02.png')}>
                            <View style={{ position: 'relative'}}>
                                    <Image source={require('../../assets/miniprof-icon/profile-icon02.png')}
                                    style={[styles.iconImage, selectedIcon === 'profile-icon01.png' && styles.selectedIcon]}/>
                                    {selectedIcon === 'profile-icon02.png' && (
                                    <Image
                                        source={require('../../assets/check-circle.png')}
                                        style={styles.selectionImage}/>)}
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleIconSelect('profile-icon03.png')}>
                            <View style={{ position: 'relative'}}>
                                <Image source={require('../../assets/miniprof-icon/profile-icon03.png')}
                                style={[styles.iconImage, selectedIcon === 'profile-icon03.png' && styles.selectedIcon]}/>
                                {selectedIcon === 'profile-icon03.png' && (
                                <Image
                                    source={require('../../assets/check-circle.png')}
                                    style={styles.selectionImage}/>)}
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleIconSelect('profile-icon04.png')}>
                            <View style={{ position: 'relative'}}>
                                    <Image source={require('../../assets/miniprof-icon/profile-icon04.png')}
                                    style={[styles.iconImage, selectedIcon === 'profile-icon04.png' && styles.selectedIcon]}/>
                                    {selectedIcon === 'profile-icon04.png' && (
                                    <Image
                                        source={require('../../assets/check-circle.png')}
                                        style={styles.selectionImage}/>)}
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View style={{flexDirection: 'row'}}>

                        <TouchableOpacity onPress={() => handleIconSelect('profile-icon08.png')}>
                            <View style={{ position: 'relative'}}>
                                <Image source={require('../../assets/miniprof-icon/profile-icon08.png')}
                                style={[styles.iconImage, selectedIcon === 'profile-icon08.png' && styles.selectedIcon]}/>
                                {selectedIcon === 'profile-icon08.png' && (
                                <Image
                                    source={require('../../assets/check-circle.png')}
                                    style={styles.selectionImage}/>)}
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleIconSelect('profile-icon05.png')}>
                            <View style={{ position: 'relative'}}>
                                <Image source={require('../../assets/miniprof-icon/profile-icon05.png')}
                                style={[styles.iconImage, selectedIcon === 'profile-icon05.png' && styles.selectedIcon]}/>
                                {selectedIcon === 'profile-icon05.png' && (
                                <Image
                                    source={require('../../assets/check-circle.png')}
                                    style={styles.selectionImage}/>)}
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleIconSelect('profile-icon06.png')}>
                            <View style={{ position: 'relative'}}>
                                <Image source={require('../../assets/miniprof-icon/profile-icon06.png')}
                                style={[styles.iconImage, selectedIcon === 'profile-icon06.png' && styles.selectedIcon]}/>
                                {selectedIcon === 'profile-icon06.png' && (
                                <Image
                                    source={require('../../assets/check-circle.png')}
                                    style={styles.selectionImage}/>)}
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleIconSelect('profile-icon07.png')}>
                            <View style={{ position: 'relative'}}>
                                <Image source={require('../../assets/miniprof-icon/profile-icon07.png')}
                                style={[styles.iconImage, selectedIcon === 'profile-icon07.png' && styles.selectedIcon]}/>
                                {selectedIcon === 'profile-icon07.png' && (
                                <Image
                                    source={require('../../assets/check-circle.png')}
                                    style={styles.selectionImage}/>)}
                            </View>
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity style={styles.button_save} onPress={handleSave}>
                        <Text style={globalStyles.textButton}>Save</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        width: 307,
        height: 260,
        borderRadius: 10,
        marginTop: 250,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor:'#F1F5F6',
        borderColor: '#004257',
        borderWidth: 0.5
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',

    },
    changeiconHeader: {
            justifyContent: 'center',
            backgroundColor: '#004257',
            borderRadius: 10,
            width: 145,
            height: 45,
            alignSelf: 'center',
            alignItems: 'center',
            bottom: 120,
            marginHorizontal: 'auto',
            right: 40
    },
    button_save: {
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: '#004257',
        borderRadius: 10,
        width: 145,
        height: 45,
        alignItems: 'center',
        marginHorizontal: 'auto',
        bottom: -175,
    },
    iconImage: {
        margin: 0.01
    },
    selectionImage: {
        position: 'absolute',
        right: 0,
        top: 40
    }
})