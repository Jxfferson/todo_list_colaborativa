// src/App.jsx
import React from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { TaskProvider } from './context/TaskContext'
import Login from './components/Login'
import TasksPage from './components/TasksPage'
import './App.css'

function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route 
        path="/login" 
        element={!isAuthenticated ? <Login /> : <Navigate to="/tasks" replace />} 
      />
      <Route 
        path="/tasks" 
        element={isAuthenticated ? <TasksPage /> : <Navigate to="/login" replace />} 
      />
      <Route 
        path="/" 
        element={<Navigate to={isAuthenticated ? "/tasks" : "/login"} replace />} 
      />
      <Route 
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  )
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <AppRoutes />
        </TaskProvider>
      </AuthProvider>
    </Router>
  )
}