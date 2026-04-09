/**
 * Main Application Entry Point
 * 
 * @author Atharv Waykar
 * @email atharvwaykar3@gmail.com
 * @license MIT
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
