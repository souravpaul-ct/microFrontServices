import React, { useEffect, useState } from 'react';
import './todo.css'
const SimpleTodo = ({ completedTask, setCompletedTask, pendingTask, setPendingTask }) => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: false },
    { id: 3, text: 'Task 3', completed: false },
    { id: 4, text: 'Task 4', completed: false },
  ]);

  // Update completed and pending tasks count whenever tasks change
  useEffect(() => {
    const completedCount = tasks.filter(task => task.completed).length;
    const pendingCount = tasks.length - completedCount;

    setCompletedTask(completedCount);
    setPendingTask(pendingCount);
  }, [tasks, setCompletedTask, setPendingTask]);

  // Toggle task completion state
  const handleToggle = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Display result in an alert
  

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">My Todo List</h2>
      <div className="space-y-3">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded hover:bg-gray-100">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task.id)}
              className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className={`text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
              {task.text}
            </span>
          </div>
        ))}
      </div>
      
      </div>
    
  );
};

export default SimpleTodo;
