import PropTypes from 'prop-types';
import axios from 'axios';
import { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import { show_success_toast, show_error_toast } from '../utils/myToast';
import Header from './Hearder';
import { storage } from '../utils/storage';
import { useNavigate } from 'react-router-dom';



const client = axios.create({
    // withCredentials: true,
    baseURL: "http://127.0.0.1:8000/sasubook/"
  });

function LoginForm(props){
    const navigate = useNavigate()

    const { setCurrentUser, email, setEmail, setId, setName} = useContext(UserContext)
    const [ password, setPassword ] = useState('');

    
    function submitLogin(e) {
        e.preventDefault();
        client.post(
          "/login/",
          {
            email: email,
            password: password
          },
        ).then(function(res) {
          storage.set('auth', res.data.jwt)
          setCurrentUser(true);
          // console.log(`Data: ${res.data.user.id}`)
          // const myUser = res.data.user;
          setName(res.data.user.name)
          setId(res.data.user.id)
          // setEmail(res.data.user.email)
          navigate('/user')
          show_success_toast("Sesión iniciada con éxito.")
        }).catch(function(res){
          console.log(res.response.data)
          show_error_toast(res.response.data)
        });
      }

    return(

        <div className='max-w-xl mx-auto'>
            <Header 
            heading="Ingresa a tu cuenta" paragraph="¿Aún no tienes una cuenta?  " textButton="Regístrate" update_form_btn={props.update_form_btn} />
            <form onSubmit={e => submitLogin(e)}>
                <div className='flex flex-col w-full'>
                    <label className='self-start'>Dirección de email</label>
                    <input type='email' placeholder='correo@email.com' required value={email} onChange={e => setEmail(e.target.value)}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'></input>
                </div>
                <div className='flex flex-col'>
                    <label className='self-start'>Contraseña</label>
                    <input type='password' placeholder='contraseña' required value={password} onChange={e => setPassword(e.target.value)} 
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'></input>
                </div>
                <button type="submit" className='w-full bg-gray-950'>Ingresar</button>
            </form>
        </div>
    )
}
LoginForm.propTypes = {
    update_form_btn: PropTypes.func
}

export default LoginForm;