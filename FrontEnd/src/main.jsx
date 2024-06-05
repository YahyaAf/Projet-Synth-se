import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { AuthAdminContextProvider } from './context/AuthAdminContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthAdminContextProvider>
    <AuthContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthContextProvider>
  </AuthAdminContextProvider>

)
