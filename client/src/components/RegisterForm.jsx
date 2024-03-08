import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { show_success_toast } from '../utils/myToast';
import Header from './Hearder';
import { storage } from '../utils/storage';
import PropTypes from 'prop-types';


const client = axios.create({
    // withCredentials: true,
    baseURL: "http://127.0.0.1:8000/sasubook/"
  });

function RegisterForm(props){
    // let { update_form_btn } = props;
    const { setCurrentUser, email, setEmail, name, setName, password, setPassword } = useContext(UserContext)
    
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
            show_success_toast("Sesión iniciada con éxito.")
    
          });
        });
      }

    return(

        <div >   
            <Header 
                heading="Regístrate para crear una cuenta" paragraph="¿Ya tienes una cuenta?  " textButton="Ingresar" update_form_btn={props.update_form_btn} />
            {/* <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-400">
                Regístrate para crear una cuenta
            </h2>
            <p className="text-center text-sm text-slate-400 mt-5">
            ¿Ya tienes una cuenta? <span><button id="form_btn" onClick={update_form_btn}>Ingresar</button></span>
            </p> */}
            <form onSubmit={e => submitRegistration(e)}>
                <div className='flex flex-col w-full'>
                <label className='self-start'>Dirección de email</label>
                <input type='email' placeholder='correo@email.com' value={email} onChange={e => setEmail(e.target.value)}
                className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'></input>
                </div>
                <div className='flex flex-col'>
                <label className='self-start'>Nombre de usuario</label>
                <input type='text' placeholder='nombre de usuario' value={name} onChange={e => setName(e.target.value)} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'></input>
                </div>
                <div className='flex flex-col'>
                <label className='self-start'>Contraseña</label>
                <input type='password' placeholder='contraseña' value={password} onChange={e => setPassword(e.target.value)} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'></input>
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