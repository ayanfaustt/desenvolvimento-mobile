import axios from 'axios'

export const ListSummaries = (userId, ip) => {
    var url = `${ip}/summaries/list/${userId}`
    return axios.get(url)
    
}

export const CreateNewSummarie = (userId, data, ip) => {
    var url = `${ip}/summaries/create/${userId}`
    return axios.post(url, data)
    
}

export const ListTags = (userId, ip) => {
    var url = `${ip}/tags/list/${userId}`
    return axios.get(url)
}
