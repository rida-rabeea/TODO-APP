import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from '../components/TodoForm';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import '../App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();  // Initialize useNavigate hook

  // Fetch all todos on initial render
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  // Add a new todo
  const handleAdd = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  // Delete a todo by title
  const handleDelete = async (title) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${encodeURIComponent(title)}`);
      setTodos((prev) => prev.filter((t) => t.title !== title));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  // Toggle completed status
  const handleToggleComplete = async (todo) => {
    try {
      await axios.put(
        `http://localhost:5000/todos/${encodeURIComponent(todo.title)}`,
        { completed: !todo.completed }
      );

      setTodos((prev) =>
        prev.map((t) =>
          t.title === todo.title ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  // Logout handler
  const handleLogout = () => {
    // You can clear any user state or authentication token here if needed
    navigate('/');  // Navigate back to Login page
  };

  return (
    <div className="app-container">
      <h1 className="app-title">TaskMaster</h1>
      
      {/* Logout Button */}
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>

      <TodoForm onAdd={handleAdd} />

      <h2 className="todos-header">Your Todos</h2>
      <ul className="todos-list">
        {todos.map((todo) => (
          <li key={todo.title} className="todo-item">
            <span
              onClick={() => handleToggleComplete(todo)}
              className={`todo-text ${todo.completed ? 'completed' : ''}`}
            >
              {todo.title}
            </span>
            <button
              onClick={() => handleDelete(todo.title)}
              className="delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
