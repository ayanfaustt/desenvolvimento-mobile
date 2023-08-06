import axios from 'axios'

export const LoginUser = (data, ip) => {
    var url = `${ip}/session/login`
    return axios.post(url, data)
    
}

export const CreateUser = (username, data, ip) => {
    var url = `${ip}/user/create/${username}`
    return axios.post(url, data)
    
}

