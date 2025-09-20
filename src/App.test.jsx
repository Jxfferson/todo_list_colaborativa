import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('App renders sin errores', () => {
  render(<App />); // No envolver en MemoryRouter si App ya tiene BrowserRouter

  // Cambiar matcher al texto que realmente aparece
  expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument();
});
