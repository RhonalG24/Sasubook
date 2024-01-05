import axios from 'axios'

const usersApi = axios.create({
    baseURL: 'http://localhost:8000/sasubook/api/v1/users/'
})

// export const getAllUsers = () => {
//     return axios.get('http://localhost:8000/sasubook/api/v1/users/')
// }
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