import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginModal from './LoginModal'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(!user)
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner">Cargando...</div>
      </div>
    )
  }

  // Función para manejar el cierre del modal
  const handleModalClose = () => {
    setShowLoginModal(false)
    navigate('/') // Redirige a la página de inicio
  }

  if (!user) {
    return (
      <>
        <LoginModal 
          isOpen={showLoginModal} 
          onClose={handleModalClose}
        />
      </>
    )
  }

  return children
}
