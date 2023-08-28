import axios from 'axios'

export const ListCards = (deckId, ip) => {
    var url = `${ip}/cards/list/${deckId}`
    return axios.get(url)
    
}

export const OpenCard = (cardId, ip) => {
    var url = `${ip}/cards/${cardId}`
    return axios.get(url)
    
}