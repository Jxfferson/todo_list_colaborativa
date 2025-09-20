import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTasks } from '../context/TaskContext'
import { AlertContainer } from '../components/Alert'
import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'

export default function TasksPage() {
  const { user, logout } = useAuth()
  const { alerts } = useTasks()
  const [editingTask, setEditingTask] = useState(null)
  const handleCancelEdit = () => {
    setEditingTask(null)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Todo List Colaborativa - Jose Correa / Jefferson Correa</h1>
            <p className="text-gray-600">Bienvenido, {user?.name}. Aca podras editar tus tareas de forma colaborativa con tu compañero, podras editarlas, marcarlas como completadas y eliminarlas. Gracias por leer:(</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <TaskForm 
          editingTask={editingTask} 
          onCancelEdit={handleCancelEdit}
        />
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Tareas</h2>
          <TaskList onEditTask={setEditingTask} />
        </div>
      </main>

      <AlertContainer alerts={alerts} />
    </div>
  )
}