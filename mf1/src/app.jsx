import React from 'react';

import Style from './style.css';
import SimpleTodo from './components/todo';

const App = ({ completedTask, setCompletedTask, pendingTask, setPendingTask }) => {

  return (
    <div className="mf1">
      <SimpleTodo 
        completedTask={completedTask}
        setCompletedTask={setCompletedTask}
        pendingTask={pendingTask}
        setPendingTask={setPendingTask}
      />
    </div>
  );
};

export default App;