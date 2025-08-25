import React, { useState } from 'react';
import { FaQrcode, FaUser, FaFacebook, FaGoogle, FaApple, FaTimes, FaEnvelope, FaLock } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './LoginModal.css';

function LoginModal({ isOpen, onClose }) {
  const [isEmailMode, setIsEmailMode] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithEmail, signInWithOAuth, signUp } = useAuth();

  if (!isOpen) return null;

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await signInWithEmail(email, password);
      onClose();
    } catch (err) {
      setError(err.message);
      console.error('Error de inicio de sesión:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (!username.trim()) {
      setError('El nombre de usuario es requerido');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await signUp(email, password, username);
      
      if (error) throw error;

      if (data.user) {
        // Si el registro fue exitoso y el usuario está autenticado
        if (data.session) {
          onClose();
        } else {
          // Si se requiere verificación de email
          alert('Se ha enviado un enlace de verificación a tu correo electrónico. Por favor verifica tu email para continuar.');
          onClose();
        }
      }
    } catch (err) {
      let errorMessage = err.message;
      if (err.message.includes('already registered')) {
        errorMessage = 'Este correo electrónico ya está registrado';
      }
      setError(errorMessage);
      console.error('Error de registro:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    setError('');
    try {
      const { data } = await signInWithOAuth(provider);
      if (data) onClose();
    } catch (err) {
      setError(err.message);
      console.error('Error de inicio de sesión con OAuth:', err.message);
    }
  };

  const handleOverlayClick = (e) => {
    // Solo cerrar si se hizo clic en el overlay y no en el contenido del modal
    if (e.target.className === 'modal-overlay') {
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="modal-content">
          <h1>Inicia sesión en TikTok</h1>
          
          <div className="login-options">
            {isEmailMode ? (
              <form onSubmit={isRegisterMode ? handleRegister : handleEmailLogin} className="email-form">
                {error && <div className="error-message">{error}</div>}
                {isRegisterMode && (
                  <div className="input-group">
                    <FaUser />
                    <input
                      type="text"
                      placeholder="Nombre de usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                )}
                <div className="input-group">
                  <FaEnvelope />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <FaLock />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {isRegisterMode && (
                  <div className="input-group">
                    <FaLock />
                    <input
                      type="password"
                      placeholder="Confirmar contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                )}
                <button type="submit" className="submit-button" disabled={loading}>
                  {loading 
                    ? (isRegisterMode ? 'Registrando...' : 'Iniciando sesión...') 
                    : (isRegisterMode ? 'Registrarse' : 'Iniciar sesión')}
                </button>
                <div className="form-footer">
                  <button 
                    type="button" 
                    className="text-button"
                    onClick={() => setIsRegisterMode(!isRegisterMode)}
                  >
                    {isRegisterMode ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
                  </button>
                  <button 
                    type="button" 
                    className="back-button" 
                    onClick={() => {
                      setIsEmailMode(false);
                      setIsRegisterMode(false);
                    }}
                  >
                    Volver
                  </button>
                </div>
              </form>
            ) : (
              <>
                
                
                <button 
                  className="login-option"
                  onClick={() => setIsEmailMode(true)}
                >
                  <FaUser />
                  <span>Usar teléfono, correo o nombre de usuario</span>
                </button>
                
                
                <button 
                  className="login-option google"
                  onClick={() => handleOAuthLogin('google')}
                >
                  <FaGoogle />
                  <span>Continuar con Google</span>
                </button>
                
                
              </>
            )}
          </div>

          <div className="modal-footer">
            <p>
              <span>¿No tienes cuenta?</span>
              <button 
                className="text-button"
                onClick={() => {
                  setIsEmailMode(true);
                  setIsRegisterMode(true);
                }}
              >
                Registrarse
              </button>
            </p>
            <div className="terms">
              <p>
                Al continuar, aceptas los
                <button className="text-button">Términos de Servicio</button>
                y confirmas que has leído nuestra
                <button className="text-button">Política de Privacidad</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
