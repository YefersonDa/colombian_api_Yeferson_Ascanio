import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Router>
  <Routes>
    <Route path="/colombia_dash" element={<App />}/>
    <Route path="*" element={<Navigate to="/colombia_dash" replace />} />
  </Routes>

  </Router>
  </StrictMode>,
  
)




