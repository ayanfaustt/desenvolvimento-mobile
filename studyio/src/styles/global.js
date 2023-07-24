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
    },
    container:{
        backgroundColor: '#F1F5F6',
        flex: 1,
        borderColor: '#004257',
        borderWidth: 0.5,
        borderRadius: 10,
        margin: 30
    },
    container2:{
        backgroundColor: '#DAE9F1',
        flex: 1,
        borderColor: '#004257',
        borderWidth: 0.5,
        borderRadius: 10,
        margin: 30
    },
    tittlePage:{
        fontSize: 28,
        textAlign: 'center',
        marginTop: 20
    },
    card:{
        backgroundColor: '#A4C3DA',
        height: 88,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        marginTop: 15
    },
    cardContent:{
        borderColor: '#004257',
        borderWidth: 0.5,
        borderRadius: 10,
        height: 78,
        margin: 5
    },
    cardText:{
        fontSize: 16,
        fontWeight: 700,
        marginTop: 10,
        marginLeft: 5
    },
    cardText2:{
      fontSize: 14,
        fontWeight: 200,
        marginLeft: 10
    }
});
