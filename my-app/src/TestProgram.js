import React, { useState, useRef, useEffect } from "react";

function InputWithPreviousValue() {
  const [currentValue, setCurrentValue] = useState("");
  const previousValueRef = useRef(""); 

  useEffect(() => {
    previousValueRef.current = currentValue;
  }, [currentValue]);

  const handleChange = (event) => {
    setCurrentValue(event.target.value);
  };

  return (
    <div>
      <input
        type="text" value={currentValue} onChange={handleChange}
        placeholder="Type something..."
      />
      <p> Current Value: {currentValue} </p>
      <p> Previous Value: {previousValueRef.current} </p>
    </div>
  );
}

export default InputWithPreviousValue;
