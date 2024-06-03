import '../App.css';
import { useState, useContext } from 'react';
import axios from 'axios';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UsersPage } from './UsersPage/'
import { UserFileFormPage } from './UserFileFormPage'
import { Navigation } from '../components/Navigation'
import { Toaster } from 'react-hot-toast'
import { show_success_toast } from '../utils/myToast';
import { storage } from '../utils/storage';
import { MatchAllRoute } from './MatchAllRoute';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
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
            <div className="min-h-full max-h-full h-screen flex justify-center mt-1 py-2 px-2 sm:px-6 lg:px-8">
                <div className="max-w-full w-full space-y-8">
                    <BrowserRouter>
                    <Nav currentUser={currentUser} submitLogout={submitLogout}/>
                        <Routes>
                            <Route path='/user'element={ <UsersPage/> }/>
                            <Route path='/convert_pdf' element={ <UserFileFormPage/> }/>
                            <Route path="*" element={<MatchAllRoute />} />
                        </Routes>
                        <div className="flex justify-center w-full">
                        <h2>Usuario actual: {email}</h2>
                        </div>
                        <Toaster/>
                    </BrowserRouter>
                </div>
                </div>
            </div>
        );
    }
    return (
        <div>
            <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl w-full space-y-8">
                    <BrowserRouter>
                    <Navigation />
                        <Toaster/>
                    {
                        registrationToggle ? (
                            <RegisterForm update_form_btn={update_form_btn}></RegisterForm>
                            ) : (
                                <LoginForm update_form_btn={update_form_btn}></LoginForm>
                                )
                            }
                    </BrowserRouter>
                </div>
            </div>
        </div>
    );
}

export default SasubookApp;