import React, { useState, useEffect } from 'react'
import { Plus, Save, X } from 'lucide-react'
import { useTasks } from '../context/TaskContext'

export function TaskForm({ editingTask, onCancelEdit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { createTask, updateTask, showAlert } = useTasks()

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDescription(editingTask.description || '')
    } else {
      setTitle('')
      setDescription('')
    }
  }, [editingTask])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim()) {
      showAlert('El título es requerido', 'error')
      return
    }

    try {
      if (editingTask) {
        await updateTask(editingTask.id, { title, description })
        onCancelEdit() // Salir del modo edición
      } else {
        await createTask({ title, description })
      }
      setTitle('')
      setDescription('')
    } catch (error) {
      console.error('Error saving task:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {editingTask ? 'Editar Tarea' : 'Nueva Tarea'}
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Título *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Título de la tarea"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Descripción de la tarea"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {editingTask ? <Save size={16} /> : <Plus size={16} />}
            {editingTask ? 'Actualizar' : 'Crear'} Tarea
          </button>

          {editingTask && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              <X size={16} />
              Cancelar
            </button>
          )}
        </div>
      </div>
    </form>
  )
}