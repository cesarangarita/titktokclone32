import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const { signInWithEmail, signInWithOAuth, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Obtener la ruta a la que el usuario intentaba acceder
  const from = location.state?.from?.pathname || "/"

  useEffect(() => {
    // Si el usuario ya está autenticado, redirigir
    if (user) {
      navigate(from, { replace: true })
    }
  }, [user, navigate, from])

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    
    try {
      await signInWithEmail(email, password)
    } catch (error) {
      alert('Error al iniciar sesión: ' + error.message)
    }
  }

  const handleOAuthLogin = async (provider) => {
    try {
      await signInWithOAuth(provider)
    } catch (error) {
      alert('Error al iniciar sesión: ' + error.message)
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
              
              <form onSubmit={handleEmailLogin} className="mb-4">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Iniciar Sesión
                </button>
              </form>

              <div className="text-center mb-3">
                <span>O inicia sesión con</span>
              </div>

              <div className="d-grid gap-2">
                <button
                  onClick={() => handleOAuthLogin('github')}
                  className="btn btn-dark"
                >
                  GitHub
                </button>
                <button
                  onClick={() => handleOAuthLogin('google')}
                  className="btn btn-danger"
                >
                  Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
