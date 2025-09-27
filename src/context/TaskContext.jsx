import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { initialTasks } from '../data'

const TaskContext = createContext(null)

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [alerts, setAlerts] = useState([])
  const { user } = useAuth()

  // Cargar tareas desde localStorage o initialTasks
  const loadTasks = () => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    } else {
      setTasks(initialTasks)
      localStorage.setItem('tasks', JSON.stringify(initialTasks))
    }
  }

  // Guardar tareas en localStorage
  const saveTasks = (newTasks) => {
    setTasks(newTasks)
    localStorage.setItem('tasks', JSON.stringify(newTasks))
  }

  // Crear tarea
  const createTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      createdAt: new Date().toISOString(),
      createdBy: user.name,
      updatedAt: new Date().toISOString(),
      updatedBy: user.name,
      completed: false
    }
    const newTasks = [...tasks, newTask]
    saveTasks(newTasks)
    showAlert('Tarea creada exitosamente', 'success')
    return newTask
  }

  // Actualizar tarea
  const updateTask = (id, updates) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          ...updates,
          updatedAt: new Date().toISOString(),
          updatedBy: user.name
        }
      }
      return task
    })
    saveTasks(newTasks)
    showAlert('Tarea actualizada exitosamente', 'success')
    return newTasks.find(t => t.id === id)
  }

  // Eliminar tarea
  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id)
    saveTasks(newTasks)
    showAlert('Tarea eliminada exitosamente', 'success')
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
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== newAlert.id))
    }, 5000)
  }

  // Cerrar alerta manualmente
  const closeAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  useEffect(() => {
    if (user) {
      loadTasks()
    } else {
      setTasks([])
    }
  }, [user])

  const value = {
    tasks,
    alerts,
    createTask,
    updateTask,
    deleteTask,
    showAlert,
    closeAlert
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTasks() {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error('useTasks debe usarse dentro de <TaskProvider>')
  return ctx
}
