import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from './Login';

test('Login renders correctamente', () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>
  );

  expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Usuario/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument();
});
