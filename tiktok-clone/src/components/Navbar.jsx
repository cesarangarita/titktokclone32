import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCompass,
  FaUser,
  FaUserFriends,
  FaVideo,
  FaComment,
  FaBell,
  FaPlus,
} from "react-icons/fa";
import "./Navbar.css";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <nav className="sidebar">
      <div className="logo">
        <svg viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#25F4EE" }} />
              <stop offset="100%" style={{ stopColor: "#FE2C55" }} />
            </linearGradient>
          </defs>
          {/* Ícono musical */}
          <g transform="translate(-25, 12) scale(0.8)">
            <path
              d="M56.17 13.47c-2.73-2.66-4.55-6.22-5.23-10.13-.09-.52-.16-1.05-.21-1.57V0h-13.8v54.77c-.02 6.38-5.21 11.55-11.6 11.55-1.88 0-3.65-.45-5.22-1.24a11.585 11.585 0 0 1-6.38-10.36c0-6.4 5.19-11.6 11.6-11.6 1.23 0 2.41.19 3.52.54V29.64c-1.15-.16-2.32-.24-3.48-.24C11.35 29.43 0 40.78 0 54.77c0 8.78 4.46 16.51 11.24 21.06a25.22 25.22 0 0 0 14.12 4.29c14.01 0 25.36-11.35 25.36-25.35V26.78a32.785 32.785 0 0 0 19.12 6.12V19.19c-2.11 0-4.2-.34-6.18-1.01-1.39-.47-4.02-1.31-7.5-4.71z"
              fill="url(#gradient1)"
            />
          </g>
          {/* Texto TikTok */}
          <g transform="translate(-32,4) scale(0.9)" style={{ zIndex: 2 }}>
            <path
              d="M88.2 23.03v9.64h11.29v36.72h11.29V32.93h9.19l3.15-9.9zm92.43 0v9.64h11.29v36.72h11.29V32.93h9.19l3.15-9.9zm-55.4 5.47c0-3.02 2.46-5.47 5.51-5.47s5.52 2.45 5.52 5.47-2.47 5.47-5.52 5.47-5.51-2.45-5.51-5.47zm0 9.38h11.02v31.51h-11.02zm15.75-14.85v46.36h11.03V57.41l3.41-3.13 10.76 15.37H178l-15.49-22.4 13.92-13.55h-13.39l-11.03 10.94V23.02h-11.03zm118.95 0v46.36h11.03V57.41l3.41-3.13 10.77 15.37h11.82l-15.49-22.4 13.92-13.55H282l-11.03 10.94V23.02h-11.03zM234.19 69.65c10.59 0 19.17-8.51 19.17-19.01s-8.58-19.01-19.17-19.01h-.26c-10.59 0-19.17 8.51-19.17 19.01s8.58 19.01 19.17 19.01zm-9.45-19.01c0-5.11 4.18-9.24 9.32-9.24s9.32 4.14 9.32 9.24-4.18 9.25-9.32 9.25c-5.15 0-9.32-4.14-9.32-9.25z"
              fill="black"
            />
          </g>
        </svg>
      </div>
      <div className="sidebar-nav">
        <Link
          to="/"
          className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path d="M24.95 7.84a1.5 1.5 0 0 0-1.9 0l-16.1 13.2a1.5 1.5 0 0 0 .95 2.66h2.33l1.2 13.03A2.5 2.5 0 0 0 13.9 39h7.59a1 1 0 0 0 1-1v-9.68a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1V38a1 1 0 0 0 1 1h7.59a2.5 2.5 0 0 0 2.49-2.27l1.19-13.03h2.33a1.5 1.5 0 0 0 .95-2.66l-16.1-13.2Z" />
          </svg>{" "}
          Para ti
        </Link>
        <Link
          to="/explore"
          className={`nav-item ${
            location.pathname === "/explore" ? "active" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path d="M24 40.5a16.5 16.5 0 1 0 0-33 16.5 16.5 0 0 0 0 33Zm4.43-14.54c-.12.6-.49 1.12-1.01 1.44l-8.88 5.37a.65.65 0 0 1-.98-.69l2.01-10.18c.12-.6.49-1.12 1.01-1.44l8.88-5.37a.65.65 0 0 1 .98.69l-2.01 10.18Z" />
            <path d="m21.92 26.89 3.4-2.05.76-3.9-3.4 2.06-.76 3.89Z"></path>
          </svg>{" "}
          Explorar
        </Link>
        <Link
          to="/following"
          className={`nav-item ${
            location.pathname === "/following" ? "active" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path d="M18.99 3a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 4a6 6 0 1 0 0 12.00A6 6 0 0 0 19 7ZM18.99 26c2.96 0 5.6.58 7.87 1.65l-3.07 3.06a15.38 15.38 0 0 0-4.8-.71C10.9 30 6.3 35.16 6 43c-.02.55-.46 1-1.02 1h-2c-.55 0-1-.45-.98-1C2.33 32.99 8.7 26 19 26ZM35.7 41.88 31.82 38H45a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H31.82l3.88-3.88a1 1 0 0 0 0-1.41l-1.41-1.42a1 1 0 0 0-1.42 0l-7.3 7.3a2 2 0 0 0 0 2.82l7.3 7.3a1 1 0 0 0 1.42 0l1.41-1.42a1 1 0 0 0 0-1.41Z" />
          </svg>{" "}
          Siguiendo
        </Link>
        <Link
          to="/following"
          className={`nav-item ${
            location.pathname === "/following" ? "active" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path d="M25.5 17a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0ZM7.1 34.8C8.8 30.21 12.82 27 18 27c5.18 0 9.21 3.22 10.9 7.79.4 1.12-.29 2.21-1.4 2.21h-19c-1.11 0-1.8-1.1-1.4-2.2ZM40.63 37H32c-.77-2.84-1.99-5.4-3.86-7.23A9.41 9.41 0 0 1 33 28.5c4.24 0 7.54 2.4 8.91 6.51.34 1-.37 1.99-1.28 1.99ZM33 26.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z" />
          </svg>{" "}
          Amigos
        </Link>
        <Link
          to="/live"
          className={`nav-item ${
            location.pathname === "/live" ? "active" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path d="M16.57 7.49a1 1 0 0 0-.13 1.4l3.62 4.31H15.7c-2.8 0-4.2 0-5.27.55a5 5 0 0 0-2.18 2.18C7.7 17 7.7 18.4 7.7 21.2v10.7c0 2.8 0 4.2.55 5.27a5 5 0 0 0 2.18 2.19c1.07.54 2.47.54 5.27.54h16.6c2.8 0 4.2 0 5.27-.54a5 5 0 0 0 2.19-2.19c.54-1.07.54-2.47.54-5.27V21.2c0-2.8 0-4.2-.54-5.27a5 5 0 0 0-2.19-2.18c-1.07-.55-2.47-.55-5.27-.55h-4.42l3.61-4.3a1 1 0 0 0-.12-1.41l-.77-.65a1 1 0 0 0-1.4.13l-5.23 6.22-5.23-6.22a1 1 0 0 0-1.4-.13l-.77.65Zm-.87 8.71h16.6c1.45 0 2.36 0 3.04.06.65.05.83.14.87.16.37.19.68.5.87.87.02.04.1.22.16.87.06.68.06 1.6.06 3.04v10.7c0 1.45 0 2.36-.06 3.04-.05.65-.14.83-.16.87a2 2 0 0 1-.87.87c-.04.02-.22.1-.87.16-.68.06-1.59.06-3.04.06H15.7c-1.45 0-2.36 0-3.04-.06a2.47 2.47 0 0 1-.87-.16 2 2 0 0 1-.87-.87c-.02-.04-.1-.22-.16-.87-.06-.68-.06-1.59-.06-3.04V21.2c0-1.45 0-2.36.06-3.04.05-.65.14-.83.16-.87a2 2 0 0 1 .87-.87c.04-.02.22-.1.87-.16a42.2 42.2 0 0 1 3.04-.06Z" />
            <path d="M16.78 26.82c-.08.18-.08.41-.08.88v3.9c0 .47 0 .7.08.88.1.25.3.44.54.54.18.08.41.08.88.08.47 0 .7 0 .88-.08a1 1 0 0 0 .54-.54c.08-.18.08-.41.08-.88v-3.9c0-.47 0-.7-.08-.88a1 1 0 0 0-.54-.54c-.18-.08-.41-.08-.88-.08-.47 0-.7 0-.88.08a1 1 0 0 0-.54.54ZM22.5 21.4c0-.47 0-.7.08-.88a1 1 0 0 1 .54-.54c.18-.08.41-.08.88-.08.47 0 .7 0 .88.08.25.1.44.3.54.54.08.18.08.41.08.88v10.2c0 .47 0 .7-.08.88a1 1 0 0 1-.54.54c-.18.08-.41.08-.88.08-.47 0-.7 0-.88-.08a1 1 0 0 1-.54-.54c-.08-.18-.08-.41-.08-.88V21.4ZM28.38 24.32c-.08.18-.08.41-.08.88v6.4c0 .47 0 .7.08.88.1.25.3.44.54.54.18.08.41.08.88.08.47 0 .7 0 .88-.08a1 1 0 0 0 .54-.54c.08-.18.08-.41.08-.88v-6.4c0-.47 0-.7-.08-.88a1 1 0 0 0-.54-.54c-.18-.08-.41-.08-.88-.08-.47 0-.7 0-.88.08a1 1 0 0 0-.54.54Z" />
          </svg>{" "}
          LIVE
        </Link>
        <Link
          to="/messages"
          className={`nav-item ${
            location.pathname === "/messages" ? "active" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path d="M45.73 9.5a2 2 0 0 0-1.73-1H4a2 2 0 0 0-1.48 3.35l10.44 11.47a2 2 0 0 0 2.2.52l14.49-5.5c.17-.07.25-.04.28-.03.06.02.14.08.2.2.07.1.08.2.08.27 0 .04-.02.12-.16.23l-11.9 10.1a2 2 0 0 0-.62 2.12l4.56 14.51a2 2 0 0 0 3.64.4l20-34.64a2 2 0 0 0 0-2Z" />
          </svg>{" "}
          Mensaje
        </Link>
        <Link
          to="/activity"
          className={`nav-item ${
            location.pathname === "/activity" ? "active" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path d="M11.5 9h25a2.5 2.5 0 0 1 2.5 2.5l.06 21a2.5 2.5 0 0 1-2.5 2.5H29.2l-3.27 4a2.5 2.5 0 0 1-3.87 0l-3.28-4h-7.35a2.5 2.5 0 0 1-2.5-2.5l.06-21A2.5 2.5 0 0 1 11.5 9ZM29 21H19a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1Z" />
          </svg>{" "}
          Actividad
        </Link>
        <Link
          to="/upload"
          className={`nav-item ${
            location.pathname === "/upload" ? "active" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path d="M33.58 4.5H14.42c-1.33 0-2.45 0-3.37.07-.95.08-1.86.25-2.73.7a7 7 0 0 0-3.06 3.05 7.14 7.14 0 0 0-.69 2.73 44.6 44.6 0 0 0-.07 3.37v19.16c0 1.33 0 2.45.07 3.37.08.95.25 1.86.7 2.73a7 7 0 0 0 3.05 3.06c.87.44 1.78.6 2.73.69.92.07 2.04.07 3.37.07h19.16c1.33 0 2.45 0 3.37-.07a7.14 7.14 0 0 0 2.73-.7 7 7 0 0 0 3.06-3.05c.44-.87.6-1.78.69-2.73.07-.92.07-2.04.07-3.37V14.42c0-1.33 0-2.45-.07-3.37a7.14 7.14 0 0 0-.7-2.73 7 7 0 0 0-3.05-3.06 7.14 7.14 0 0 0-2.73-.69 44.6 44.6 0 0 0-3.37-.07ZM10.14 8.83c.2-.1.53-.21 1.24-.27.73-.06 1.69-.06 3.12-.06h19c1.43 0 2.39 0 3.12.06a3.3 3.3 0 0 1 1.24.27 3 3 0 0 1 1.31 1.3c.1.21.21.54.27 1.25.06.73.06 1.69.06 3.12v19c0 1.43 0 2.39-.06 3.12a3.3 3.3 0 0 1-.27 1.24 3 3 0 0 1-1.3 1.31c-.21.1-.54.21-1.25.27-.73.06-1.69.06-3.12.06h-19c-1.43 0-2.39 0-3.12-.06a3.3 3.3 0 0 1-1.24-.27 3 3 0 0 1-1.31-1.3c-.1-.21-.21-.54-.27-1.25-.06-.73-.06-1.69-.06-3.12v-19c0-1.43 0-2.39.06-3.12a3.3 3.3 0 0 1 .27-1.24 3 3 0 0 1 1.3-1.31Z" />
            <path d="M25 15a1 1 0 0 1 1 1v6h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-6v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-6h-6a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h6v-6a1 1 0 0 1 1-1h2Z" />
          </svg>{" "}
          Carga
        </Link>
        <Link
          to="/profile"
          className={`nav-item ${
            location.pathname === "/profile" ? "active" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.83 7.5a14.34 14.34 0 1 1 0 28.68 14.34 14.34 0 0 1 0-28.68Zm0-4a18.33 18.33 0 1 0 11.48 32.64l8.9 8.9a1 1 0 0 0 1.42 0l1.4-1.41a1 1 0 0 0 0-1.42l-8.89-8.9A18.34 18.34 0 0 0 21.83 3.5Z"
            />
          </svg>{" "}
          Perfil
        </Link>{" "}
      </div>

      <div className="sidebar-divider"></div>

      <div className="sidebar-section">
        {user ? (
          <button onClick={signOut} className="login-button">
            Cerrar sesión
          </button>
        ) : (
          <>
            <p className="login-message">
              Inicia sesión para seguir creadores, dar me gusta a videos y ver
              comentarios.
            </p>
            <button onClick={() => setIsLoginModalOpen(true)} className="login-button">
              Iniciar sesión
            </button>
          </>
        )}
      </div>

      {!user && (
        <LoginModal 
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}

      <div className="sidebar-footer">
        <div style={{ marginBottom: "8px", color:"black" }}>Cuentas que sigues</div>
        <div style={{ marginBottom: "8px", color:"black" }}>
          Las cuentas que sigues aparecerán aquí
        </div>
        <div style={{ marginBottom: "8px", color:"black" }}>© 2025 TikTok</div>
      </div>
    </nav>
  );
}

export default Navbar;
