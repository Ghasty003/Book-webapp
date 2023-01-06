import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminHomePage from './pages/AdminHomePage'
import UserHomePage from './pages/UserHomePage'

function App() {
  
  return (
    <div className="App">
     <Routes>
      <Route path='/'>
        <Route index element={<UserHomePage />} />
        <Route path='/admin' element={<AdminHomePage />} />
      </Route>
     </Routes>
    </div>
  )
}

export default App
