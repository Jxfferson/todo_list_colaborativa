import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AuthContext = createContext(null)
const API_USERS = 'http://localhost:3000/users'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (username, password) => {
  try {
    const res = await axios.get(`${API_USERS}`)
    const users = res.data
    const foundUser = users.find(
      u => u.username === username && u.password === password
    )

    if (!foundUser) {
      return { ok: false, message: 'Credenciales inválidas' }
    }

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
  } catch (error) {
    return { ok: false, message: 'Error en el servidor' }
  }
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