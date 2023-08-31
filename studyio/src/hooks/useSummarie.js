import axios from 'axios'

export const ListSummaries = (userId, ip, token) => {
    const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
    var url = `${ip}/summaries/list/${userId}`
    return axios.get(url, authorization)
    
}

export const CreateNewSummarie = (userId, data, ip, token) => {
    const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
    var url = `${ip}/summaries/create/${userId}`
    return axios.post(url, data, authorization)
    
}
