import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'

const TaskContext = createContext(null)
const API_TASKS = 'http://localhost:3000/tasks'

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [alerts, setAlerts] = useState([])
  const { user } = useAuth()

  // Cargar tareas
  const loadTasks = async () => {
    try {
      setLoading(true)
      const res = await axios.get(API_TASKS)
      setTasks(res.data)
    } catch (error) {
      showAlert('Error al cargar tareas', 'error')
    } finally {
      setLoading(false)
    }
  }

  // Crear tarea
  const createTask = async (taskData) => {
    try {
      const newTask = {
        ...taskData,
        createdAt: new Date().toISOString(),
        createdBy: user.name,
        updatedAt: new Date().toISOString(),
        updatedBy: user.name,
        completed: false
      }

      const res = await axios.post(API_TASKS, newTask)
      setTasks(prev => [...prev, res.data])
      showAlert('Tarea creada exitosamente', 'success')
      return res.data
    } catch (error) {
      showAlert('Error al crear tarea', 'error')
      throw error
    }
  }

  // Actualizar tarea
  const updateTask = async (id, updates) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id)
      const updatedTask = {
        ...taskToUpdate,
        ...updates,
        updatedAt: new Date().toISOString(),
        updatedBy: user.name
      }

      const res = await axios.put(`${API_TASKS}/${id}`, updatedTask)
      setTasks(prev => prev.map(task => task.id === id ? res.data : task))
      showAlert('Tarea actualizada exitosamente', 'success')
      return res.data
    } catch (error) {
      showAlert('Error al actualizar tarea', 'error')
      throw error
    }
  }

  // Eliminar tarea
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_TASKS}/${id}`)
      setTasks(prev => prev.filter(task => task.id !== id))
      showAlert('Tarea eliminada exitosamente', 'success')
    } catch (error) {
      showAlert('Error al eliminar tarea', 'error')
      throw error
    }
  }

  // Mostrar alertas
  const showAlert = (message, type = 'info') => {
    const newAlert = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toISOString(),
      user: user?.name || 'Sistema'
    }
    
    setAlerts(prev => [...prev, newAlert])
    
    // Auto-eliminar alerta después de 5 segundos
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== newAlert.id))
    }, 5000)
  }

  // Cargar tareas al iniciar
  useEffect(() => {
    if (user) {
      loadTasks()
    }
  }, [user])

  const value = {
    tasks,
    loading,
    alerts,
    createTask,
    updateTask,
    deleteTask,
    loadTasks,
    showAlert
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTasks() {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error('useTasks debe usarse dentro de <TaskProvider>')
  return ctx
}