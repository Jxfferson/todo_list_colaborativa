import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

// Usuarios "mock" guardados en código
const MOCK_USERS = [
  { id: 1, username: 'admin', password: '1234', name: 'Administrador' },
  { id: 2, username: 'usuario2', password: 'abcd', name: 'J' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  const login = async (username, password) => {
    // Simular delay opcional: await new Promise(r => setTimeout(r, 300))
    const foundUser = MOCK_USERS.find(
      u => u.username === username && u.password === password
    )

    if (!foundUser) return { ok: false, message: 'Credenciales inválidas' }

    const session = {
      id: foundUser.id,
      username: foundUser.username,
      name: foundUser.name,
      token: `token-${Date.now()}-${foundUser.id}`
    }

    setUser(session)
    localStorage.setItem('user', JSON.stringify(session))
    navigate('/tasks', { replace: true })

    return { ok: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    navigate('/login', { replace: true })
  }

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    login,
    logout
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
