import React from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
}

const colorMap = {
  success: 'bg-green-100 border-green-400 text-green-700',
  error: 'bg-red-100 border-red-400 text-red-700',
  warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
  info: 'bg-blue-100 border-blue-400 text-blue-700'
}

export function Alert({ alert, onClose }) {
  const Icon = iconMap[alert.type] || Info

  return (
    <div className={`fixed top-4 right-4 z-50 border rounded-lg p-4 shadow-lg min-w-80 ${colorMap[alert.type]}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">{alert.message}</p>
            <p className="text-sm opacity-75 mt-1">
              Por: {alert.user} • {new Date(alert.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="ml-4 p-1 hover:opacity-70 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export function AlertContainer({ alerts, onCloseAlert }) {
  return (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-2">
      {alerts.map(alert => (
        <Alert key={alert.id} alert={alert} onClose={() => onCloseAlert(alert.id)} />
      ))}
    </div>
  )
}