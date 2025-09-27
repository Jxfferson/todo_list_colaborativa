import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Login from './components/Login';
import './App.css';
import TasksPage from './pages/TasksPage';

function App() {
  return (
    <Router basename="/todo_list_colaborativa/">
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;