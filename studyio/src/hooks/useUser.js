import axios from 'axios'

export const LoginUser = (data) => {
    var url = `http://192.168.100.5:8000/session/login`
    return axios.post(url, data)
    
}