import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminHomePage from './pages/AdminHomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import UserHomePage from './pages/UserHomePage'

function App() {
  
  return (
    <div className="App">
     <Routes>
      <Route path='/'>
        <Route index element={<UserHomePage />} />
        <Route path='/admin' element={<AdminHomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Route>
     </Routes>
    </div>
  )
}

export default App
