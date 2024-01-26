import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom' 
import { UsersPage } from './pages/UsersPage/'
import { UserFormPage } from './pages/UserFormPage/'
import { UserFileFormPage } from './pages/UserFileFormPage'
import { Navigation }from './components/Navigation'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <BrowserRouter>
    <div className='container mx-auto'>

      <Navigation /> 

      <Routes>
        <Route path='/' element={ <Navigate to='/users'/> } />
        <Route path='/users' element={ <UsersPage/> } />
        <Route path='/users-create' element={ <UserFormPage/> } />
        <Route path='/users/:id' element={ <UserFormPage/> } />
        <Route path='/upload_pdf' element={ <UserFileFormPage/> }/>
      </Routes>
      <Toaster/>
    </div>
    </BrowserRouter>
  )
  
}

export default App



// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'
// import { BrowserRouter } from 'react-router-dom' 
// function App() {
//   // const [count, setCount] = useState(0)

//   return 
//     // <>
//     //   <div>
//     //     <a href="https://vitejs.dev" target="_blank">
//     //       <img src={viteLogo} className="logo" alt="Vite logo" />
//     //     </a>
//     //     <a href="https://react.dev" target="_blank">
//     //       <img src={reactLogo} className="logo react" alt="React logo" />
//     //     </a>
//     //   </div>
//     //   <h1>Vite + React</h1>
//     //   <div className="card">
//     //     <button onClick={() => setCount((count) => count + 1)}>
//     //       count is {count}
//     //     </button>
//     //     <p>
//     //       Edit <code>src/App.jsx</code> and save to test HMR
//     //     </p>
//     //   </div>
//     //   <p className="read-the-docs">
//     //     Click on the Vite and React logos to learn more
//     //   </p>
//     // </>
  
// }

// export default App
