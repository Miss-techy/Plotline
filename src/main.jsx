import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
 // lets you find common bugs in your components early during development.
  <StrictMode>
  <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)


