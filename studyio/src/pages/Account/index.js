    import React from 'react';
    import { View, Text, StyleSheet, TouchableOpacity, Image, Modal} from 'react-native';
    import { globalStyles } from '../../styles/global';
    import {Picker} from '@react-native-picker/picker';

    const Changeiconmodal = ({visible, children}) => {
        const [showModal, setShowModal] = React.useState(visible)
        React.useEffect(() =>  {
            toggleModal()
        }, [visible]);

        const toggleModal = () => {
            if(visible){
                setShowModal(true);
            }else{
                setShowModal(false);
            }
        }

        const [selectedValue, setSelectedValue] = React.useState('EN');

        return <Modal transparent visible={showModal}>
            <View style={styles.changeiconmodal}>
                <View style={styles.changepasscontainer}>{children}</View>
            </View>
        </Modal>
    };

    export function Account() {

        const [visible, setVisible] = React.useState(false);

        return (
            <View style={globalStyles.container2}>
                <View>
                    <Image
                        source={require('../../assets/prof-icon/prof-icon01.png')}
                        style={{ alignSelf: 'center', marginTop: 30 }} />
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <Image
                        source={require('../../assets/edit.png')}
                        style={styles.editProfiButton}
                    />
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
                            <Picker
                                selectedValue={selectedValue}
                                onValueChange={(itemValue) => setSelectedValue(itemValue)}>
                                <Picker.Item label="EN" value="EN" />
                                <Picker.Item label="BR" value="BR" />
                            </Picker>
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
                    <Changeiconmodal visible={visible}>
                        <View style={{flexBasis: 'auto',}}>
                            <View style={styles.header}>
                                <View style={styles.button_changeicon}>
                                    <Text style={globalStyles.textButton}>Change icon</Text>
                                </View>
                                <TouchableOpacity style={styles.closechangeicon} onPress={() => setVisible(false)}>
                                    <Image source={require('../../assets/x.png')}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{alignSelf: 'center', alignItems: 'center', height: '5%', bottom: '150%'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={require('../../assets/miniprof-icon/profile-icon01.png')}/>
                                    <Image source={require('../../assets/miniprof-icon/profile-icon02.png')}/>
                                    <Image source={require('../../assets/miniprof-icon/profile-icon03.png')}/>
                                    <Image source={require('../../assets/miniprof-icon/profile-icon04.png')}/>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={require('../../assets/miniprof-icon/profile-icon08.png')}/>
                                    <Image source={require('../../assets/miniprof-icon/profile-icon05.png')}/>
                                    <Image source={require('../../assets/miniprof-icon/profile-icon06.png')}/>
                                    <Image source={require('../../assets/miniprof-icon/profile-icon07.png')}/>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.button_save}>
                                <Text styles={{color: '#DAE9F1'}}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </Changeiconmodal>
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
        changeiconmodal: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center'
        },
        changepasscontainer: {
            width: '80%',
            backgroundColor: '#F1F5F6',
            paddingHorizontal: 20,
            paddingVertical: 90,
            borderColor: '#004257',
            borderWidth: 0.5,
            borderRadius: 10,
            margin: 30
        },
        closechangeicon: {
            alignSelf: 'flex-end',
            alignItems: 'flex-end',
            marginLeft: 105,
            bottom: 100
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
        button_changeicon: {
            justifyContent: 'center',
            backgroundColor: '#004257',
            borderRadius: 10,
            width: 145,
            height: 45,
            alignSelf: 'center',
            alignItems: 'center',
            bottom: 110,
            marginHorizontal: 'auto'
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