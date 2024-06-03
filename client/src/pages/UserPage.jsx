import { getMyUser } from '../api/user.api';
import { useEffect, useContext } from 'react';
import { show_error_toast } from '../utils/myToast';
import UserContext from '../contexts/UserContext';


export function UserPage(){
    // const [ user, setUser ] = useState({})
    const { name } = useContext(UserContext)
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