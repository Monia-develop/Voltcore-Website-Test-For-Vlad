import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom' // <-- On change BrowserRouter par HashRouter
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Avec HashRouter, pas besoin de spécifier de basename ! */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)