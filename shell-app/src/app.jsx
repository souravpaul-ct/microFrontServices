import React, { useState } from 'react';
import './style.css';
import Comp_One from 'mf1/App';
import Comp_two from 'mf2/App';

const App = () => {
  const [completedTask, setCompletedTask] = useState(0);
  const [pendingTask, setPendingTask] = useState(0);
  const [isClicked, setIsClicked] = useState(false); // use boolean value, not a string

  const handleGetResult = () => {
    alert(`Completed Tasks: ${completedTask}, Pending Tasks: ${pendingTask}`);
  };

  return (
    <div className="shell">
      <h1>To-Do App</h1>
      
      {!isClicked ? (
        <>
          <Comp_One
            completedTask={completedTask}
            setCompletedTask={setCompletedTask}
            pendingTask={pendingTask}
            setPendingTask={setPendingTask}
          />
          <div className="mt-4">
            <button
              onClick={() => setIsClicked(!isClicked)} // Fix: Wrap the toggling in a function
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            >
              Get Result
            </button>
          </div>
        </>
      ) : (
        <Comp_two 
        completedTask = {completedTask}
        pendingTask = {pendingTask}
        isClicked = {isClicked}
        setIsClicked = {setIsClicked} />
      )}
    </div>
  );
};

export default App;
