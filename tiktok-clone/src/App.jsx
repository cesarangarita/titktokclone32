import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Following from './pages/Following'
import Upload from './pages/Upload'
import Profile from './pages/Profile'
import Login from './pages/Login'
import MobileNav from './components/MobileNav'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/following" element={<ProtectedRoute><Following /></ProtectedRoute>} />
          <Route path="/friends" element={<ProtectedRoute><div>Amigos</div></ProtectedRoute>} />
          <Route path="/live" element={<ProtectedRoute><div>Live</div></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute><div>Mensajes</div></ProtectedRoute>} />
          <Route path="/activity" element={<ProtectedRoute><div>Actividad</div></ProtectedRoute>} />
        </Routes>
        {/* Barra inferior móvil tipo TikTok global */}
        <MobileNav />
      </main>
    </div>
  )
}

export default App
