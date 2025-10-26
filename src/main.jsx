import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const redirectPath = sessionStorage.getItem('rnagym-spa-redirect')
if (redirectPath) {
  sessionStorage.removeItem('rnagym-spa-redirect')
  if (redirectPath !== window.location.pathname + window.location.search + window.location.hash) {
    window.history.replaceState(null, '', redirectPath)
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
