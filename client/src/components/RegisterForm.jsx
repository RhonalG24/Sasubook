import axios from 'axios';
import { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import { show_error_toast, show_success_toast } from '../utils/myToast';
import Header from './Hearder';
import { storage } from '../utils/storage';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


const client = axios.create({
    // withCredentials: true,
    baseURL: "http://127.0.0.1:8000/sasubook/"
  });

function RegisterForm(props){
    // let { update_form_btn } = props;
    const navigate = useNavigate()
    const { setCurrentUser, email, setEmail, name, setName, setId } = useContext(UserContext)
    const [ password, setPassword ] = useState('');

    
    function submitRegistration(e) {
        e.preventDefault();
        client.post(
          "/register/",
          {
            email: email,
            // username: username,
            name: name,
            password: password
          }
          ).then(function() {
          show_success_toast("Usuario registrado con éxito")
          client.post(
            "/login/",
            {
              email: email,
              password: password
            },
            // {withCredentials: true}
          ).then(function(res) {
            // storage.set('auth', res.data.jwt)
            setCurrentUser(true);
            storage.set('auth', res.data.jwt)
            setName(res.data.user.name)
            setId(res.data.user.id)
            navigate('/user')
            show_success_toast("Sesión iniciada con éxito.")
    
          });
        }).catch(function(res) {
          console.log(res.response.data)
          show_error_toast(res.response.data)
        });
      }

    return(

        <div >   
            <Header 
                heading="Regístrate para crear una cuenta" paragraph="¿Ya tienes una cuenta?  " textButton="Ingresar" update_form_btn={props.update_form_btn} />
            <form onSubmit={e => submitRegistration(e)}>
                <div className='flex flex-col w-full'>
                  <label className='self-start'>Dirección de email</label>
                  <input type='email' placeholder='correo@email.com' required value={email} onChange={e => setEmail(e.target.value)}
                  className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'></input>
                </div>
                <div className='flex flex-col'>
                  <label className='self-start'>Nombre de usuario</label>
                  <input type='text' placeholder='nombre de usuario' required value={name} onChange={e => setName(e.target.value)} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'></input>
                </div>
                <div className='flex flex-col'>
                  <label className='self-start'>Contraseña</label>
                  <input type='password' placeholder='contraseña' required value={password} onChange={e => setPassword(e.target.value)} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'></input>
                </div>
                <button type="submit" className='w-full bg-gray-950'>Registrar</button>
            </form>
        </div>
    )
}
RegisterForm.propTypes = {
    update_form_btn: PropTypes.func
}

export default RegisterForm;