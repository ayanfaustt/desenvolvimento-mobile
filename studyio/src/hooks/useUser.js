import axios from 'axios'

export const LoginUser = (data, ip) => {
    var url = `${ip}/session/login`
    return axios.post(url, data)
    
}

export const CreateUser = (username, data, ip) => {
    var url = `${ip}/user/create/${username}`
    return axios.post(url, data)
    
}

// Alteração de nome de usuário

export const UpdateUsername = (username, data, ip) => {
    var url = `${ip}/user/update/${username}`
    return axios.put(url, data)
}

// Alteração de senha

export const Updatepassword = (password, data, ip) => {
    var url = '${ip}/user/'
    return axios.put(url, data)
}