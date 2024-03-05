// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import { UsersPage } from './pages/UsersPage/'
// import { UserFormPage } from './pages/UserFormPage/'
// import { UserFileFormPage } from './pages/UserFileFormPage'
// import { Navigation }from './components/Navigation'
// import { useEffect, useState } from "react"
// import { Toaster } from 'react-hot-toast'
// import toast from 'react-hot-toast'

// import RegisterPage from './pages/Register'
// import LoginPage from './pages/Login'

// import axios from 'axios'
// import { set } from 'react-hook-form'


// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'X-CSRFToken'
// axios.defaults.withCredentials = true

// const client = axios.create({
//   baseURL: "http://127.0.0.1:8000/sasubook"
// })

// function App() {
//   return (
//     <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       {/* <div className="max-w-md w-full space-y-8"> */}
//       <div className="max-w-xl w-full space-y-8">
//       <BrowserRouter>
//         <Navigation />
//           <Routes>
//               <Route path="/" element={<LoginPage/>} />
//               <Route path="/register" element={<RegisterPage/>} />
//               <Route path='/convert_pdf' element={ <UserFileFormPage/> }/>

//           </Routes>
//         </BrowserRouter>
//       </div>
//     </div>
//   );
// }

// // function App() {

// //   const [currentUser, setCurrentUser] = useState()
// //   const [registrationToggle, setRegistrationToggle] = useState(false)
// //   const [email, setEmail] = useState('')
// //   const [username, setUsername] = useState('')
// //   const [password, setPassword] = useState('')


// //   useEffect(() => {
// //     client.get('/user')
// //     .then(function(res) {
// //       setCurrentUser(true)
// //     })
// //     .catch(function(error) {
// //       setCurrentUser(false)
// //     })
// //   }, [])

// //   function successLogin() {
// //     toast.success('Usuario logueado', {
// //     position: "bottom-right",
// //     style: {
// //         background: "#101010",
// //         color: "fff"
// //     }
// //   })}

// //   function update_form_btn(){
// //     if (registrationToggle){
// //       document.getElementById("form_btn").innerHTML = "Registrarse"
// //       setRegistrationToggle(false)
// //     } else {
// //       document.getElementById("form_btn").innerHTML = "Ingresar"
// //       setRegistrationToggle(true)
// //     }
// //   }

// //   function submitRegistration(e) {
// //     e.preventDefault()
// //     client.post(
// //       '/register',
// //       {
// //         email: email,
// //         username: username,
// //         password: password
// //       }
// //     ).then(function(res){
// //       client.post(
// //         '/login',
// //         {
// //           email: email,
// //           password: password
// //         }
// //       ).then(function(res) {
// //         setCurrentUser(true)
// //         successLogin()
// //       })
// //     })
// //   }

// //   function submitLogin(e) {
// //     e.preventDefault()
// //     client.post(
// //       '/login',
// //       {
// //         email: email,
// //         password: password
// //       }
// //     ).then(function(res) {
// //       setCurrentUser(true)
// //       successLogin()
// //     })
// //   }

// //   function submitLogout(e) {
// //     e.preventDefault()
// //     client.post(
// //       '/logout',
// //       {withCredentials: true}
// //     ).then(function(res) {
// //       setCurrentUser(false)
// //     })
// //   }

// //   if (currentUser) {
// //     return (
// //       <BrowserRouter>
// //         <div className='container mx-auto'>

// //           <Navigation />

// //           <Routes>
// //             <Route path='/' element={ <Navigate to='/users'/> } />
// //             <Route path='/users' element={ <UsersPage/> } />
// //             <Route path='/users-create' element={ <UserFormPage/> } />
// //             <Route path='/users/:id' element={ <UserFormPage/> } />
// //             <Route path='/convert_pdf' element={ <UserFileFormPage/> }/>
// //             <Route path='/logout' element={ <Logout/>} />
// //           </Routes>
// //           <Toaster/>
// //         </div>
// //       </BrowserRouter>
// //     )
// //   }
// //   return(
// //     <BrowserRouter>
// //         <div className='container mx-auto'>

// //       <Navigation />
// //       <button>Registrar</button>
// //     </div>
// //     </BrowserRouter>

// //   )

// // }

// export default App



// // // import { useState } from 'react'
// // // import reactLogo from './assets/react.svg'
// // // import viteLogo from '/vite.svg'
// // // import './App.css'
// // import { BrowserRouter } from 'react-router-dom'
// // function App() {
// //   // const [count, setCount] = useState(0)

// //   return
// //     // <>
// //     //   <div>
// //     //     <a href="https://vitejs.dev" target="_blank">
// //     //       <img src={viteLogo} className="logo" alt="Vite logo" />
// //     //     </a>
// //     //     <a href="https://react.dev" target="_blank">
// //     //       <img src={reactLogo} className="logo react" alt="React logo" />
// //     //     </a>
// //     //   </div>
// //     //   <h1>Vite + React</h1>
// //     //   <div className="card">
// //     //     <button onClick={() => setCount((count) => count + 1)}>
// //     //       count is {count}
// //     //     </button>
// //     //     <p>
// //     //       Edit <code>src/App.jsx</code> and save to test HMR
// //     //     </p>
// //     //   </div>
// //     //   <p className="read-the-docs">
// //     //     Click on the Vite and React logos to learn more
// //     //   </p>
// //     // </>

// // }

// // export default App




import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
// import { UsersPage } from './pages/UsersPage/'
import { UserPage } from './pages/UserPage/'
// import { UserFormPage } from './pages/UserFormPage/'
import { UserFileFormPage } from './pages/UserFileFormPage'
import { Navigation }from './components/Navigation'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import { show_success_toast, show_error_toast } from './utils/myToast';
import { storage } from './utils/storage';

import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'
import { MatchAllRoute } from './pages/MatchAllRoute';
import Input from './components/Input';
import Header from './components/Hearder';

// import { AppUserPage } from './pages/AppUserPage'
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.withCredentials = true;

const client = axios.create({
  // withCredentials: true,
  baseURL: "http://127.0.0.1:8000/sasubook/"
});

function App() {
 
  const [currentUser, setCurrentUser] = useState(false);
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  // const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const jwt = storage.get('auth')
  // jwt ? setCurrentUser(true) : setCurrentUser(false)

  // useEffect(() => {
  //   client.get("/user")
  //   .then(function(res) {
  //     setCurrentUser(true);
  //   })
  //   .catch(function(error) {
  //     setCurrentUser(false);
  //   });
  // }, []);

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  }

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
      ).then(function(res) {
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

  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "/login/",
      {
        email: email,
        password: password
      },
      // {withCredentials: true}
    ).then(function(res) {
      // console.log(`res: ${res}`)
      // console.log(res.data.jwt)
      storage.set('auth', res.data.jwt)
      // localStorage.setItem('auth2', res.jwt)
      setCurrentUser(true);
      // console.log(res)
      // setUsername(res.data.username)
      setName(res.data.name)
      show_success_toast("Sesión iniciada con éxito.")
    //   toast.success("Sesión iniciada.", {position: "bottom-right", style: {
    //     background: "#101010",
    //     color: "fff"
    // }});
      // Navigate({to:'/'})
    }).catch(function(res){
      // console.log(res.response.data)
      console.log("entró al error")
      show_error_toast("Usuario o contraseña incorrecta")
    });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/logout/",
      // {withCredentials: true}
    ).then(function(res) {
      storage.remove('auth')
      setCurrentUser(false);
      show_success_toast("Sesión cerrada con éxito.")
    });
  }



  // const {state} = useLocation()
  if (currentUser) {
    return (
      <div>
        {/* <Navbar bg="dark" variant="dark">
          <Container>Register
            <Navbar.Brand>Authentication App</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <form onSubmit={e => submitLogout(e)}>
                  <Button type="submit" variant="light">Log out</Button>
                </form>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
          <div className="center">
            <h2>You're logged in!</h2>
          </div> */}

        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl w-full space-y-8">
            {/* <div className='flex justify-end'> */}
              {/* <form onSubmit={e => submitLogout(e)}>
                <button type="submit" >Log out</button>
              </form>
            </div>
               */}
              <BrowserRouter>
                <Navigation currentUser={currentUser} submitLogout={submitLogout}/>
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
      {/* <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Authentication App</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
      
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
              <div >   
                <Header 
                  heading="Regístrate para crear una cuenta" paragraph="¿Ya tienes una cuenta?  " textButton="Ingresar" update_form_btn={update_form_btn} />
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
            ) : (

              <div className='max-w-xl mx-auto'>
                <Header 
                  heading="Ingresa a tu cuenta" paragraph="¿Aún no tienes una cuenta?  " textButton="Regístrate" update_form_btn={update_form_btn} />
                {/* <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-400">
                Ingresa a tu cuenta
                </h2>
                <p className="text-center text-sm text-slate-400 mt-5">
                ¿Aún no tienes una cuenta? <span><button id="form_btn" onClick={update_form_btn}>Regístrate</button></span>
                </p> */}
                <form onSubmit={e => submitLogin(e)}>
                  <div className='flex flex-col w-full'>
                    <label className='self-start'>Dirección de email</label>
                    <input type='email' placeholder='correo@email.com' value={email} onChange={e => setEmail(e.target.value)}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'></input>
                  </div>
                  <div className='flex flex-col'>
                    <label className='self-start'>Contraseña</label>
                    <input type='password' placeholder='contraseña' value={password} onChange={e => setPassword(e.target.value)} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'></input>
                  </div>
                  <button type="submit" className='w-full bg-gray-950'>Ingresar</button>
                </form>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;