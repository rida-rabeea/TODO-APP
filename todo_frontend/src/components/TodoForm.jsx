import { useState } from 'react';
import axios from 'axios';
import './TodoForm.css';

function TodoForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      // Send 'title' and 'completed' as expected by the backend
      const res = await axios.post('http://localhost:5000/todos', {
        title: text,
        completed: false,
      });

      onAdd(res.data); // Add new todo to UI
      setText('');     // Clear input field
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px', textAlign: 'center' }}>
      <input
        type="text"
        value={text}
        placeholder="Enter a todo"
        onChange={(e) => setText(e.target.value)}
        style={{ padding: '10px', width: '250px', marginRight: '10px' }}
      />
      <button type="submit" style={{ padding: '10px 20px' }}>
        Add
      </button>
    </form>
  );
}

export default TodoForm;
