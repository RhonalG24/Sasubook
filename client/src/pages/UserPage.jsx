import axios from 'axios';
import { getMyUser } from '../api/user.api';
import { storage } from '../utils/storage';
import { useState, useEffect, useContext } from 'react';
import { get } from 'react-hook-form';
import { show_error_toast } from '../utils/myToast';
import UserContext from '../contexts/UserContext';

// async function getUser(){
//     const formData = new FormData();
//     formData.append('jwt', storage.get('auth'))
//     const csrftoken = storage.getcookie('csrftoken')
    
//     const response = await axios.get(
//         'http://localhost:8000/sasubook/user/', 
//         {"jwt": storage.get('auth')}, 
//         {   
//             responseType: 'blob', 
//             // headers: {'content-type': 'multipart/form-data', 'X-CSRFToken': storage.getcookie('csrftoken')},
//             headers: { 'X-CSRFToken': csrftoken},
//             withCredentials: true
//         } 
//     )

//     return response.data

// }


export function UserPage(){
    // const [ user, setUser ] = useState({})
    const { id, setId, name, setName, user, setUser, email } = useContext(UserContext)
    // const jwt = storage.get('auth')
    useEffect( () => {
        async function getUser(){
            const user = await getMyUser()
            if (user){
                // setUser(user)
                // setId(user.id)
                // console.log(`getMyUser -> id: ${user.id}`)
            }else{
                show_error_toast("Hubo un problema al obtener la información del usuario")
            }
        } 
        getUser()
    }, [])
    // console.log(user)
    return(
        // <h1>{user.name}</h1>
        <h1>{name}</h1>
    )
}