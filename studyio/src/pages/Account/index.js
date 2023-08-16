    import { React, useState } from 'react';
    import { View, Text, StyleSheet, TouchableOpacity, Image, Modal} from 'react-native';
    import { globalStyles } from '../../styles/global';
    import { Changeiconmodal } from '../../modais/Changeicon';
    import { useNavigation } from '@react-navigation/native';

    export function Account() {
        const [selectedIcon, setSelectedIcon] = useState(null);

        const [visibleModal, setVisibleModal] = useState(false);

        const navigation = useNavigation();

        const handleIconChange = (iconName) => {
            setSelectedIcon(iconName);
            setVisibleModal(false);
        };

        const icons = {
            "profile-icon01.png": require('../../assets/prof-icon/prof-icon01.png'),
            "profile-icon02.png": require('../../assets/prof-icon/prof-icon02.png'),
            "profile-icon03.png": require('../../assets/prof-icon/prof-icon03.png'),
            "profile-icon04.png": require('../../assets/prof-icon/prof-icon04.png'),
            "profile-icon05.png": require('../../assets/prof-icon/prof-icon05.png'),
            "profile-icon06.png": require('../../assets/prof-icon/prof-icon06.png'),
            "profile-icon07.png": require('../../assets/prof-icon/prof-icon07.png'),
            "profile-icon08.png": require('../../assets/prof-icon/prof-icon08.png'),
        };

        return (
            <View style={globalStyles.container2}>

                <View>
                    <Image
                        source={selectedIcon ? icons[selectedIcon] : require('../../assets/prof-icon/prof-icon01.png')}
                        style={{ alignSelf: 'center', marginTop: 30 }} />
                    <TouchableOpacity onPress={() => setVisibleModal(true)}>
                        <Image
                            source={require('../../assets/edit.png')}
                            style={styles.editProfiButton} />
                    </TouchableOpacity>
                </View>

                <View style={styles.fields}>
                    <View style={styles.fieldsInside}>
                        <View style={styles.iconInput}>
                            <Image
                                source={require('../../assets/user-icon.png')}
                                style={{}} />
                            <Text style={styles.input}>User</Text>
                        </View>
                        <TouchableOpacity>
                            <Image
                                source={require('../../assets/edit-2.png')}
                                style={{}} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.fields}>
                    <View style={styles.fieldsInside}>
                        <View style={styles.iconInput}>
                            <Image
                                source={require('../../assets/settings.png')}
                                style={{}} />
                            <Text style={styles.input}>Language</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.button}>
                    <Text style={globalStyles.textButton}>Change password</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ () => navigation.navigate('Welcome')}
                    style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}>Logout </Text>
                    <Image
                        source={require('../../assets/log-out.png')}
                        style={styles.logouticon}/>
                </TouchableOpacity>

                <Modal
                    visible={visibleModal}
                    transparent={true}
                    onRequestClose={() => setVisibleModal(false)}>
                        <Changeiconmodal
                            handleIconChange={handleIconChange}
                            handleClose={() => setVisibleModal(false)} />
                </Modal>

            </View>
        )
    }

    const styles = StyleSheet.create({
        banana: {
            marginLeft: 30,
            marginRight: 30,
            marginTop: 80,
            borderRadius: 10,
            padding: 2,
            backgroundColor: '#A4C3DA',
        },
        header: {
            flexDirection: 'row',
            width: '100%',
            height: 40,
            alignItems: 'flex-end',
            justifyContent: 'center'
        },
        button: {
            justifyContent: 'center',
            backgroundColor: '#004257',
            borderRadius: 10,
            width: 232,
            height: 47,
            alignSelf: 'center',
            alignItems: 'center',
            bottom: '10%',
            marginTop: 200
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
            top: '230%',
            alignSelf: 'center',
            textDecorationColor: '#DAE9F1'
        },
        logoutButton: {
            position: 'absolute',
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            marginTop: 100,
            bottom: '5%',
            flexDirection: 'row',
            textDecorationColor: '#006699'
        },
        logoutButtonText: {
            color: '#006699',
            fontSize: 22
        },
        logouticon: {
            width: 16,
            height: 16
        },
        fields: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 40,
        },
        fieldsInside: {
            flexDirection: 'row',
            borderBottomWidth: 1.75,
        },
        input: {
            width: 150
        },
        iconInput: {
            flexDirection: 'row',
        },
        editProfiButton: {
            alignSelf: 'center',
            marginTop: '10%',
            justifyContent: 'center'
        },
        closeButton: {
            alignSelf: 'center',
            marginTop: '120%',
            height: 10
        },
    })