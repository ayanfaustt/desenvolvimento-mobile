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
        bottom: '15%'

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
        marginTop: '114%',
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
        marginTop: 15,
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
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 5
    },
    cardText2:{
        fontSize: 14,
        fontWeight: 'normal',
        marginLeft: 10
    },
    cardText3:{
        fontSize: 14,
        fontWeight: 'normal',
        marginLeft: 8,
        paddingTop: 30
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: -20,
        backgroundColor: '#004257',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
    },
    subButton1: {
        backgroundColor: '#006699',
        position: 'absolute',
        bottom: 140,
        right: -12,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        elevation: 3,
    },
    subButton2: {
        backgroundColor: '#006699',
        position: 'absolute',
        bottom: 90,
        right: -12,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        elevation: 3,
    },
    subButtonText: {
        color: 'black',
        fontSize: 16,
        marginRight: 10
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tagText: {
        fontSize: 14,
        paddingTop: 33,
        paddingLeft: 15,
        fontStyle: 'italic',
    },
    tagLine: {
        borderBottomWidth: 1,
        flex: 1,
        borderBottomColor: '#00212C',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20
    },
    cardFlahscard:{
        backgroundColor: '#A4C3DA',
        height: 200,
        borderRadius: 10,
        marginTop: 25,
        marginLeft: 20
    },
    cardFlahscardContent:{
        borderColor: '#004257',
        borderWidth: 0.5,
        borderRadius: 10,
        height: 190,
        margin: 5,
        justifyContent: 'center'
    },
    cardFlahscardText:{
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
});
