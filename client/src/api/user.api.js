import axios from 'axios'
import { storage } from '../utils/storage'

const csrftoken = storage.getcookie('csrftoken')
const usersApi = axios.create({
    // baseURL: 'http://localhost:8000/sasubook/api/v1/users/'
    withCredentials: true,
    baseURL: 'http://localhost:8000/sasubook/user/',
    headers: { 'X-CSRFToken': csrftoken},
})

// export const getAllUsers = () => {
    //     return axios.get('http://localhost:8000/sasubook/api/v1/users/')
    // }
    
export const getMyUser = async () => {
    const jwt = storage.get('auth')
    // console.log("mi jwt", jwt)
    const response = await usersApi.get('/', {
        params: {
          'jwt': jwt,
        }})
    // console.log(response)
    let user = response.data
    return user
}
export const getAllUsers = () => {
    return usersApi.get('/')
}

export const getUser = (id) => {
    return usersApi.get(`/${id}`)
}

export const createUser = ( user ) => {
    return usersApi.post('/', user)
}

export const deleteUser = ( id ) => {
    return usersApi.delete(`/${id}`)
}

export const updateUser = ( id, user ) => {
    return usersApi.patch(`/${id}/`, user )
}