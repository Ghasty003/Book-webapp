import React from 'react'
import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthContext from './context/AuthContext'
import AddBooks from './pages/AddBooks'
import AdminHomePage from './pages/AdminHomePage'
import DeleteBook from './pages/DeleteBook'
import GetUsers from './pages/GetUsers'
import Login from './pages/Login'
import Register from './pages/Register'
import UserCollection from './pages/UserCollection'
import UserHomePage from './pages/UserHomePage'
import UserSettings from './pages/UserSettings'

function App() {

  const { user } = useContext(AuthContext);
  
  return (
    <div className="App">
     <Routes>
      <Route path='/'>
        <Route index element={user ? <UserHomePage /> : <Navigate to="/login" />} />

        <Route path='/collection' element={user ? <UserCollection /> : <Navigate to="/login" />} />

        <Route path='/settings' element={user ? <UserSettings /> : <Navigate to="/login" />} />
        
        <Route path='admin'>
          <Route index element={user && user.email === "admin@dev.com" ? 
            <AdminHomePage /> : <Navigate to="/login" />} />

          <Route path='/admin/addbooks' element={user && user.email === "admin@dev.com" ?
          <AddBooks /> : <Navigate to="/login" />} />

          <Route path='/admin/allusers' element={user && user.email === "admin@dev.com" ?
          <GetUsers /> : <Navigate to="/login" />} />

          <Route path='/admin/deletebooks' element={user && user.email === "admin@dev.com" ?
          <DeleteBook /> : <Navigate to="/login" />} />
        </Route>

        <Route path='register' element={ !user ? <Register /> : user && user.email === "admin@dev.com" ? 
        <Navigate to="/admin" /> : <Navigate to="/" />} />

        <Route path='login' element={!user ? <Login /> : user && user.email === "admin@dev.com" ? 
        <Navigate to="/admin" /> : <Navigate to="/" />} />
      </Route>
     </Routes>
    </div>
  )
}

export default App
