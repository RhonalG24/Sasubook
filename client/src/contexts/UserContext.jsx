import { createContext, useState } from "react";

const UserContext = createContext();

const initialCurrentUser = false;

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) =>{
    const [ id, setId ] = useState();
    const [ name, setName ] = useState();
    const [ email, setEmail ] = useState('');
    const [ currentUser, setCurrentUser ] = useState(initialCurrentUser);
    // const [ password, setPassword ] = useState('');
    const [ user, setUser] = useState({})



    const data = { id, setId, name, setName, email, setEmail, currentUser, setCurrentUser, user, setUser }
    return <UserContext.Provider value={data}>{children}</UserContext.Provider>
}

export { UserProvider }
export default UserContext;