import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css' 
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { LanguageProvider } from './contexts/LanguageContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>,
)
