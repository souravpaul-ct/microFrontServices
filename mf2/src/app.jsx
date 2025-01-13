import React from 'react';
import './style.css';

const App = ({ completedTask, pendingTask, isClicked, setIsClicked }) => {

  const handleOnClick = () => {
    setIsClicked(!isClicked); // Toggle the `isClicked` state
  };

  return (
    <div className="mf2">
      <h1>Completed Tasks</h1>
      <p>{completedTask}</p>
      
      <h1>Pending Tasks</h1>
      <p>{pendingTask}</p>

      <button onClick={handleOnClick}>
        Go Back to add tasks
      </button>
    </div>
  );
};

export default App;
