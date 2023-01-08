import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthContextProvider } from './context/AuthContext'
import { BookContextProvider } from './context/BookContext'
import { UserCollectionContextProvider } from './context/UserCollectionContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <BookContextProvider>
      <UserCollectionContextProvider>
        <BrowserRouter>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </BrowserRouter>
      </UserCollectionContextProvider>
    </BookContextProvider>
  </AuthContextProvider>,
)
