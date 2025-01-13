// import {useRef} from 'react';
import './App.css';
import { useReducer } from 'react';

function reducer(state, action) {
  switch(action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return {count : 0};
    
    default:
      throw new Error("Unknown action");
  }
}

export default function Counter() {
  const initialState = {count : 0};
  const [currentState, dispatch] = useReducer(reducer, initialState);

return (
  <div>
    <p>Count: {currentState.count}</p>
    <button onClick={() => dispatch({type: 'increment'})}>Increment</button>
    <button onClick={() => dispatch({type: 'decrement'})}>Increment</button>
    <button onClick={() => dispatch({type: 'reset'})}>Increment</button>
  </div>
  );
};

