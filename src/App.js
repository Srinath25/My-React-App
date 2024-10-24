import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [bgColor, setBgColor] = useState('white');
  const [colorIndex, setColorIndex] = useState(0);

  // Array of colors to cycle through for the greeting message
  const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF33A1', '#33FFF5'];

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(`Hello, ${input}!`);
    setInput(''); // Clear the input field
    setBgColor(getRandomColor()); // Change background color
  };

  // Function to get a random background color
  const getRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return randomColor;
  };

  // Use effect to change the message color every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 2000);
    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [colors.length]); // Add colors.length as a dependency

  return (
    <div className="App" style={{ backgroundColor: bgColor }}>
      <header className="App-header">
        <h1 className="App-title">Welcome to My Fun React App</h1>
        <form onSubmit={handleSubmit}>
          <label className="input-label">
            Enter your name:
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your name here..."
            />
          </label>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>

        {/* Display the greeting message with color changes */}
        {message && (
          <h2 className="greeting-message" style={{ color: colors[colorIndex] }}>
            {message}
          </h2>
        )}
      </header>
    </div>
  );
}

export default App;