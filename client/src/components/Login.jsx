import { useState, useEffect } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from './FormAction';
import FormExtra from './FormExtra';
import Input from "./Input";

import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.withCredentials = true

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/sasubook"
  })

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){

    const [currentUser, setCurrentUser] = useState()
    const [registrationToggle, setRegistrationToggle] = useState(false)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginState,setLoginState]=useState(fieldsState);

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    useEffect(() => {
        client.get('/user')
        .then(function(res) {
        setCurrentUser(true)
        })
        .catch(function(error) {
        setCurrentUser(false)
        })
    }, [])
  
    function successLogin() {
        toast.success('Usuario logueado', { 
        position: "bottom-right",
        style: {
            background: "#101010",
            color: "fff"
        }
    })}

    //Handle Login API Integration here
    const authenticateUser = (e) =>{
        e.preventDefault()
        client.post(
            '/login',
            {
                email: email,
                password: password
            }
        ).then(function(res) {
            setCurrentUser(true)
            successLogin()
        })
    }


    return(
        <form className="mt-8 space-y-6">
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
        </div>

       <FormExtra/>
       <FormAction handleSubmit={handleSubmit} text="Ingresar"/>

      </form>
    )
}