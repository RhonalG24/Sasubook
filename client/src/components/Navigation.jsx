
import { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
// import  submitLogout from '../App'

// export function Navigation({currentUser, submitLogout}){
export function Navigation(props){

    const { currentUser } = useContext(UserContext)
    // function submitLogout(e) {
    //     e.preventDefault();
    //     client.post(
    //       "/logout/",
    //       {withCredentials: true}
    //     ).then(function(res) {
    //       setCurrentUser(false);
    //     });
    //   }
    if (currentUser){

        return (
            <div className='flex justify-between py-3'>

            {/* <Link to='/users' className='font-bold text-3xl mb-4'>
                <h1>SasuBook</h1>
            </Link> */}
            <Link to='/user' className='font-bold text-3xl mb-4'>
                <h1>SasuBook</h1>
            </Link>
            {/* <button className='bg-indigo-500 px-3 py-2 rounded-lg text-slate-100'> */}
            {/* <button className='text-slate-100'>
               <Link to='/users-create'>
                            Crear usuario
                            </Link>
            </button> */}
            <button className='text-slate-100 bg-gray-950'>
                <Link to='/convert_pdf'>Convertir PDF</Link>
            </button>
            {/* <button type="submit" className='text-slate-100' onClick={e => submitLogout(e) }> */}
            {/* <button type="submit" className='text-slate-100' onClick={() => { Navigate('/', {state: { logout: 'true'}})} }> */}
            {/* <button type="submit" className='text-slate-100' onClick={props.submitLogout}> */}
            <button type="submit" className='text-slate-100 bg-gray-950' onClick={props.submitLogout}>
                    Cerrar sesión
            </button>

        </div>
    )
} else {
    return (
        <div className='flex justify-between py-3'>

        {/* <Link to='/users' className='font-bold text-3xl mb-4'>
            <h1>SasuBook</h1>
        </Link> */}
        <Link to='/' className='font-bold text-3xl mb-4 w-full'>
            <h1>SasuBook</h1>
        </Link>
        {/* <button className='bg-indigo-500 px-3 py-2 rounded-lg text-slate-100'> */}
        {/* <button className='text-slate-100'>
           <Link to='/users-create'>
                        Crear usuario
                        </Link>
        </button> */}
        {/* <button className='text-slate-100 bg-gray-950'>
            <Link to='/convert_pdf'>Convertir PDF</Link>
        </button> */}
    </div>
)
}
}


