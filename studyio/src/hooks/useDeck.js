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

export const CreateNewDeck = (userId, data, ip, token) => {
    const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
    var url = `${ip}/decks/create/${userId}`
    return axios.post(url, data, authorization);
    
}

export const EditDeck = (deckId, data, ip, token) => {
    const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
    var url = `${ip}/decks/update/${deckId}`
    return axios.put(url, data, authorization);
    
}

export const DeleteDeck = (deckId, ip, token) => {
    const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
    var url = `${ip}/decks/delete/${deckId}`
    return axios.delete(url, authorization);
    
}