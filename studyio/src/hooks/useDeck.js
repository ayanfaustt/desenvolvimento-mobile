import axios from 'axios'

export const ListDecks = (userId) => {
    var url = `http://192.168.100.5:8000/decks/list/${userId}`
    return axios.get(url)
    
}