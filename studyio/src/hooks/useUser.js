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

export const UpdateUsername = (userId, data, ip) => {
    var url = `${ip}/user/update/${userId}`
    return axios.put(url, data)
}

// Alteração de senha

export const Updatepassword = (userId, data, ip) => {
    var url = `${ip}/user/password/${userId}`
    return axios.put(url, data)
}

// Alteração de email

export const UpdateEmail = (userId, data, ip) => {
    var url = `${ip}/user/email/${userId}`
    return axios.put(url, data)
}