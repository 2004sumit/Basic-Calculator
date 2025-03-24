import React, { useState, useEffect } from "react";
import "./Calculator.css"; // Import CSS for styling

const Calculator = () => {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const lastValue = localStorage.getItem("lastDisplay");
    if (lastValue) setDisplay(lastValue);
  }, []);

  const handleClick = (value) => {
    if (value === "AC") {
      setDisplay("0");
      localStorage.setItem("lastDisplay", "0");
    } else if (value === "=") {
      try {
        const result = eval(display).toString();
        setDisplay(result);
        localStorage.setItem("lastDisplay", result);
      } catch {
        setDisplay("Error");
      }
    } else {
      setDisplay((prev) => (prev === "0" ? value : prev + value));
    }
  };

  return (
    <div className="calculator-container">
      <div className="display">{display}</div>
      <div className="buttons">
        {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map((item) => (
          <button
            key={item}
            className={`btn ${["+", "-", "*", "/", "="].includes(item) ? "operator" : item === "AC" ? "clear" : "number"}`}
            onClick={() => handleClick(item)}
          >
            {item}
          </button>
        ))}
        <button className="btn clear" onClick={() => handleClick("AC")}>
          AC
        </button>
        <button className="btn operator" onClick={() => handleClick("**2")}>
          x²
        </button>
      </div>
    </div>
  );
};

export default Calculator;
