import '../App.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
// import { UsersPage } from './pages/UsersPage/'
import { UserPage } from './UserPage'
import { UserFileFormPage } from './UserFileFormPage'
import { Navigation } from '../components/Navigation'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import { show_success_toast, show_error_toast } from '../utils/myToast';
import { storage } from '../utils/storage';
import { MatchAllRoute } from './MatchAllRoute';
// import { RegisterForm } from '../components/RegisterForm';
import RegisterForm from '../components/RegisterForm';
// import { LoginForm } from '../components/LoginForm'
import LoginForm from '../components/LoginForm';
// import { UserContext } from '../contexts/UserContext';
import UserContext from '../contexts/UserContext';
import Nav from '../components/Nav';

const client = axios.create({
    // withCredentials: true,
    baseURL: "http://127.0.0.1:8000/sasubook/"
  });

function SasubookApp(){
    const { currentUser, setCurrentUser, email } = useContext(UserContext)
    const [ registrationToggle, setRegistrationToggle ] = useState(false);

    function update_form_btn() {
        if (registrationToggle) {
          document.getElementById("form_btn").innerHTML = "Register";
          setRegistrationToggle(false);
        } else {
          document.getElementById("form_btn").innerHTML = "Log in";
          setRegistrationToggle(true);
        }
    }

    function submitLogout(e) {
        e.preventDefault();
        client.post(
          "/logout/",
          // {withCredentials: true}
        ).then(function() {
          storage.remove('auth')
          setCurrentUser(false);
          show_success_toast("Sesión cerrada con éxito.")
        });
      }
    
    if (currentUser) {
        return (
            <div>
            <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl w-full space-y-8">
                    <BrowserRouter>
                    <Nav currentUser={currentUser} submitLogout={submitLogout}/>
                    {/* <Navigation currentUser={currentUser} submitLogout={submitLogout}/> */}
                        <Routes>
                        {/* <Route path="/" element={<LoginPage/>} />
                        <Route path="/register" element={<RegisterPage/>} /> */}
                        <Route path='/user'element={ <UserPage/> }/>
                        <Route path='/convert_pdf' element={ <UserFileFormPage/> }/>
                        <Route path="*" element={<MatchAllRoute />} />
                        </Routes>
                        <div className="center w-full">
                        <h2>¡Sesión iniciada! Usuario: {email}</h2>
                        {/* {console.log(axios.get('http://127.0.0.1:8000/sasubook/user'))} */}
                        </div>
                        <Toaster/>
                    </BrowserRouter>
                </div>
                </div>
            </div>
            // </div>
        );
    }
    return (
        <div>
            <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl w-full space-y-8">
                    <BrowserRouter>
                    <Navigation />
                        {/* <Routes> */}
                            {/* <Route path="/" element={<LoginPage/>} />
                            <Route path="/register" element={<RegisterPage/>} /> */}
                            {/* <Route path='/convert_pdf' element={ <UserFileFormPage/> }/> */}

                        {/* </Routes> */}
                        <Toaster/>
                    </BrowserRouter>

                    {
                    registrationToggle ? (
                        <RegisterForm update_form_btn={update_form_btn}></RegisterForm>
                    ) : (
                        <LoginForm update_form_btn={update_form_btn}></LoginForm>
                    )
                    }
                </div>
            </div>
        </div>
    );
}

export default SasubookApp;