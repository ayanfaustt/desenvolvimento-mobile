import axios from 'axios'

export const ListDecks = (userId, ip, token) => {
    const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
    var url = `${ip}/decks/list/${userId}`
    return axios.get(url, authorization);
    
}

export const CreateNewDeck = (userId, data, ip) => {
    var url = `${ip}/decks/create/${userId}`
    return axios.post(url, data);
    
}

export const DeleteDeck = (deckId, data, ip, token) => {
    const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
    var url = `${ip}/decks/create/${deckId}`
    return axios.delete(url, data, authorization);
    
}