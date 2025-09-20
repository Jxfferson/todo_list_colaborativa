import React from 'react'
import { Edit, Trash2, CheckCircle, Circle, User } from 'lucide-react'
import { useTasks } from '../context/TaskContext'

export function TaskList({ onEditTask }) {
  const { tasks, updateTask, deleteTask } = useTasks()

  const handleToggleComplete = async (task) => {
    try {
      await updateTask(task.id, { completed: !task.completed })
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const handleDelete = async (taskId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      try {
        await deleteTask(taskId)
      } catch (error) {
        console.error('Error deleting task:', error)
      }
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No hay tareas creadas</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <div key={task.id} className="bg-white p-4 rounded-lg shadow-md border">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <button
                onClick={() => handleToggleComplete(task)}
                className="mt-1 p-1 hover:opacity-70"
              >
                {task.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400" />
                )}
              </button>

              <div className="flex-1">
                <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-gray-600 mt-1 text-sm">{task.description}</p>
                )}
                
                <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <User size={12} />
                    Creada por: {task.createdBy}
                  </span>
                  <span>Creada: {formatDate(task.createdAt)}</span>
                  {task.updatedBy && task.updatedBy !== task.createdBy && (
                    <span>Editada por: {task.updatedBy}</span>
                  )}
                  {task.updatedAt && (
                    <span>Actualizada: {formatDate(task.updatedAt)}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2 ml-4">
              <button
                onClick={() => onEditTask(task)}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded-md"
                title="Editar tarea"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                title="Eliminar tarea"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
