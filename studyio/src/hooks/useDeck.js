import axios from 'axios'

export const ListDecks = (userId, ip) => {
    var url = `${ip}/decks/list/${userId}`
    return axios.get(url)
    
}