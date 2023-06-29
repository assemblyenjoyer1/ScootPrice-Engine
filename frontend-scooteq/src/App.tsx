import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ChooseAction from './components/Home';
import CalculatePrice from './components/CalculatePrice';
import Login from './components/Login';

function App() {
  document.title = 'ScooTeq';

  const [loggedIn, setLoggedIn] = useState(() => {
    // Get the stored value from local storage, or default to false if not present
    const storedLoggedIn = localStorage.getItem('loggedIn');
    return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
  });

  const handleLogin = (loggedIn: boolean) => {
    setLoggedIn(loggedIn);
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  };
  

  useEffect(() => {
    localStorage.setItem('loggedIn', JSON.stringify(true)); // Set the initial value to true
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        {loggedIn ? (
          <>
            <Route path="/" element={<ChooseAction />} />
            <Route path="/prices" element={<CalculatePrice />} />
          </>
        ) : (
          <>
            <Route path="/" element={<a href="/login">Go to Login</a>} />
            <Route path="/prices" element={<a href="/login">Go to Login</a>} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
