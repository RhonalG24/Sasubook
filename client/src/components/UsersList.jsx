import { useEffect, useState } from "react"
import { getAllUsers } from '../api/users.api'
import { UserCard } from "./UserCard"

export function UsersList() {
    const [users, setUsers] = useState([])
    //para ejecutar la función cada vez que se cargue este componente
    useEffect(() => {
        
        async function loadUsers(){
            const res = await getAllUsers()
            setUsers(res.data)
            // console.log(res)
        }
        
        loadUsers()
        console.log('Página cargada')
    }, [] )
    return <div className="grid grid-cols-1 gap-3"> 
        {users.map( user => (
            <UserCard key={user.id} user={user}/>
        ))}

    </div>
    
}