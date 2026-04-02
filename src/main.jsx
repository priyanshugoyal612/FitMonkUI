import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter ,Routes,Route} from 'react-router'
import ChatHome from './pages/ChatHome.jsx'
import Chat from './pages/Chat.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CheckInPage from './pages/CheckInPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
      <Route path='/chat' element={<ProtectedRoute><Chat /></ProtectedRoute>}/>

      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/checkin" element={<ProtectedRoute><CheckInPage /></ProtectedRoute >} />


      
      </Routes>
   
    </BrowserRouter>
    
  </StrictMode>,
)
