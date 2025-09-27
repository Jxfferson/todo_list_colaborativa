import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const TaskContext = createContext(null)

const TASKS_STORAGE_KEY = 'tasks'

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [alerts, setAlerts] = useState([])
  const { user } = useAuth()

  // Cargar tareas desde localStorage
  const loadTasks = () => {
    const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY)
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    } else {
      setTasks([])
    }
  }

  // Guardar tareas en localStorage
  const saveTasks = (tasksToSave) => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasksToSave))
    setTasks(tasksToSave)
  }

  // Crear tarea
  const createTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      createdAt: new Date().toISOString(),
      createdBy: user.name,
      updatedAt: new Date().toISOString(),
      updatedBy: user.name,
      completed: false
    }
    const updatedTasks = [...tasks, newTask]
    saveTasks(updatedTasks)
    showAlert('Tarea creada exitosamente', 'success')
    return newTask
  }

  // Actualizar tarea
  const updateTask = (id, updates) => {
    const updatedTasks = tasks.map(task => {
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
    saveTasks(updatedTasks)
    showAlert('Tarea actualizada exitosamente', 'success')
    return updatedTasks.find(t => t.id === id)
  }

  // Eliminar tarea
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id)
    saveTasks(updatedTasks)
    showAlert('Tarea eliminada exitosamente', 'success')
  }

  // Alertas
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
    loadTasks,
    showAlert,
    closeAlert,
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTasks() {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error('useTasks debe usarse dentro de <TaskProvider>')
  return ctx
}
