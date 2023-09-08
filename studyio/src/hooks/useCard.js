import axios from 'axios'

export const ListCards = (deckId, ip, token) => {
    const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
    var url = `${ip}/cards/list/${deckId}`
    return axios.get(url, authorization);
    
}

export const OpenCard = (cardId, ip) => {
    var url = `${ip}/cards/${cardId}`
    return axios.get(url)
    
}

export const CreateNewCard = (deckId, data, ip, token) => {
    const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
    var url = `${ip}/cards/create/${deckId}`
    return axios.post(url, data, authorization);
    
}

export const EditCard = (cardId, data, ip, token) => {
    const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
    var url = `${ip}/cards/update/${cardId}`
    return axios.put(url, data, authorization);
    
}

export const DeleteCard = (cardId, ip, token) => {
    const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
    var url = `${ip}/cards/delete/${cardId}`
    return axios.delete(url, authorization);
    
}