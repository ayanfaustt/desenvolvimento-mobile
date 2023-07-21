import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    button:{
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: '#004257',
        borderRadius: 10,
        width: 132,
        height: 37,
        alignSelf: 'center',
        alignItems: 'center',
        bottom: '10%'

    },
    textButton:{
        fontSize: 20,
        color: '#DAE9F1',
        alignItems: 'center'
    },
    textClick:{
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 430,
        color: '#006699'
    }
});
