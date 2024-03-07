import { createContext, useState } from "react";

const UserContext = createContext();

const initialCurrentUser = false;

const UserProvider = ({ children }) =>{
    const [ id, setId ] = useState();
    const [ name, setName ] = useState();
    const [ email, setEmail ] = useState('');
    const [ currentUser, setCurrentUser ] = useState(initialCurrentUser);
    const [ password, setPassword ] = useState('');



    const data = { id, setId, name, setName, email, setEmail, currentUser, setCurrentUser, password, setPassword }
    return <UserContext.Provider value={data}>{children}</UserContext.Provider>
}

export { UserProvider }
export default UserContext;