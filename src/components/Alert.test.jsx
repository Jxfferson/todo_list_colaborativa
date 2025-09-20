import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Alert, { AlertContainer } from './Alert';

test('muestra mensaje de alerta y ejecuta onClose', () => {
  const alert = { type: 'success', message: 'Prueba' };
  const onClose = jest.fn();

  render(<Alert alert={alert} onClose={onClose} />);

  expect(screen.getByText(/Prueba/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button'));
  expect(onClose).toHaveBeenCalledTimes(1);
});

test('AlertContainer renderiza varias alertas', () => {
  const alerts = [
    { type: 'success', message: 'Alerta 1' },
    { type: 'error', message: 'Alerta 2' },
  ];
  const onCloseAlert = jest.fn();

  render(<AlertContainer alerts={alerts} onCloseAlert={onCloseAlert} />);

  expect(screen.getByText(/Alerta 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Alerta 2/i)).toBeInTheDocument();
});
