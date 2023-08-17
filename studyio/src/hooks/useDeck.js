import axios from 'axios'

export const ListDecks = (userId, ip) => {
    var url = `${ip}/decks/list/${userId}`
    return axios.get(url)
    
}

export const CreateDeck = (userId, data, ip) => {
    var url = `${ip}/decks/create/${userId}`
    return axios.post(url, data)
    
}