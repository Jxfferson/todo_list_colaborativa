import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: 'green',
  error: 'red',
  warning: 'yellow',
  info: 'blue',
};

export default function Alert({ alert, onClose }) {
  const Icon = iconMap[alert.type];
  const color = colorMap[alert.type];

  return (
    <div style={{ border: `1px solid ${color}`, padding: '8px', margin: '4px', display: 'flex', alignItems: 'center' }}>
      <Icon />
      <span style={{ marginLeft: '8px' }}>{alert.message}</span>
      <button onClick={onClose} style={{ marginLeft: 'auto' }}>
        <X />
      </button>
    </div>
  );
}

export function AlertContainer({ alerts, onCloseAlert }) {
  return (
    <div>
      {alerts.map((a, i) => (
        <Alert key={i} alert={a} onClose={() => onCloseAlert(i)} />
      ))}
    </div>
  );
}
