
import { useState, useEffect, useRef } from "react";

export default function PreviousStateExample() {
  const [currentValue, setCurrentValue] = useState(0);
  const countRef = useRef(0);

  const handleOnClick = () => {
    // countRef.current = countRef.current + 1;
    setCurrentValue(currentValue + 1);
  };

  return (
    <div>
      <button onClick={handleOnClick}>Click to add 1</button>
      <p> {currentValue}</p>
    </div>
  );
}