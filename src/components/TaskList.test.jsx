import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';
import { AuthProvider } from '../context/AuthProvider';
import { TaskProvider } from '../context/TaskProvider';

// Asegúrate que TaskList es default export o ajusta import
test('TaskList renders', () => {
  render(
    <AuthProvider>
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    </AuthProvider>
  );

  expect(screen.getByText(/lista de tareas/i)).toBeInTheDocument(); // Ajusta según contenido
});
