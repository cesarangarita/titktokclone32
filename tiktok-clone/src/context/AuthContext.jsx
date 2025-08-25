import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../services/supabase'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState(null)
  const navigate = useNavigate()

  // Función para cargar el perfil del usuario
  const loadUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      setUserProfile(data)
    } catch (error) {
      console.error('Error loading user profile:', error)
    }
  }

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        // Obtener la sesión actual
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (session && mounted) {
          setUser(session.user);
          await loadUserProfile(session.user.id);
        }

        // Suscribirse a los cambios de autenticación
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (!mounted) return;

          console.log('Auth state changed:', event, session);

          if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
            setUser(session?.user ?? null);
            if (session?.user) {
              await loadUserProfile(session.user.id);
            }
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
            setUserProfile(null);
            navigate('/');
          } else if (event === 'USER_UPDATED') {
            setUser(session?.user ?? null);
            if (session?.user) {
              await loadUserProfile(session.user.id);
            }
          }
          
          setLoading(false);
        });

        return () => {
          subscription?.unsubscribe();
        };
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  const value = {
    signUp: async (email, password, username) => {
      try {
        // Primero registramos al usuario
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: username
            }
          }
        })
        
        if (signUpError) throw signUpError
        
        if (signUpData.user) {
          // Crear perfil de usuario
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: signUpData.user.id,
                username: username || email.split('@')[0],
                email: email,
                created_at: new Date()
              }
            ])
          
          if (profileError) throw profileError

          // Si tenemos una sesión después del registro
          if (signUpData.session) {
            // Establecer la sesión explícitamente
            await supabase.auth.setSession(signUpData.session)
            setUser(signUpData.user)
            await loadUserProfile(signUpData.user.id)
          } else {
            // Si no hay sesión, intentar iniciar sesión
            const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
              email,
              password
            })

            if (signInError) throw signInError

            if (signInData.session) {
              await supabase.auth.setSession(signInData.session)
              setUser(signInData.user)
              await loadUserProfile(signInData.user.id)
            }
          }
        }
        
        return signUpData
      } catch (error) {
        console.error('Error in signUp:', error)
        throw error
      }
    },
    signInWithEmail: async (email, password) => {
      try {
        // Intentar iniciar sesión
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        
        if (error) throw error

        // Si el inicio de sesión fue exitoso
        if (data.session && data.user) {
          // Establecer la sesión explícitamente
          await supabase.auth.setSession({
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token
          })
          
          // Actualizar el estado local
          setUser(data.user)
          await loadUserProfile(data.user.id)
        }

        return data
      } catch (error) {
        console.error('Error in signInWithEmail:', error)
        throw error
      }
    },
    signInWithOAuth: async (provider) => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin
        }
      })
      if (error) throw error
      return data
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUserProfile(null)
    },
    updateProfile: async (updates) => {
      try {
        const { error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', user.id)

        if (error) throw error
        setUserProfile(prev => ({ ...prev, ...updates }))
        return { success: true }
      } catch (error) {
        console.error('Error updating profile:', error)
        return { success: false, error }
      }
    },
    user,
    userProfile,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
