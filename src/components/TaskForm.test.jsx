import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { TaskProvider } from '../context/TaskContext';
import TaskForm from './TaskForm';

test('TaskForm renders correctamente', () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <TaskProvider>
          <TaskForm />
        </TaskProvider>
      </AuthProvider>
    </MemoryRouter>
  );

  expect(screen.getByText(/Nueva Tarea/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Título de la tarea/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Descripción de la tarea/i)).toBeInTheDocument();
});
