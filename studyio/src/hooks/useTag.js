import axios from 'axios'

export const CreateNewTag = (userId, data, ip, token) => {
    const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
    var url = `${ip}/tags/create/${userId}`
    return axios.post(url, data, authorization);
    
}

export const ListTags = (userId, ip, token) => {
    const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
    var url = `${ip}/tags/list/${userId}`
    return axios.get(url, authorization);
    
}