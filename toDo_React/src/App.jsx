import { useState, useEffect } from 'react'
import './App.css'
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

// Inject styles
// const styleSheet = document.createElement("style");
// styleSheet.innerText = styles;
// document.head.appendChild(styleSheet);

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [warning, setWarning] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {
    if (!title.trim()) {
      setWarning('Task title cannot be empty!');
      setTimeout(() => setWarning(''), 3000);
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      creationDate: new Date().toLocaleDateString()
    };

    setTasks([newTask, ...tasks]);
    setWarning('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>My Todo List</h1>
          <p className="subtitle">Keep track of your tasks</p>
        </header>
        
        <TaskInput onAdd={addTask} warning={warning} />
        <TaskList tasks={tasks} onDelete={deleteTask} />
      </div>
    </div>
  );
};

export default App;
