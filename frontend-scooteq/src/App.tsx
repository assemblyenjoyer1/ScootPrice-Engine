import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ChooseAction from './components/Home';
import CalculatePrice from './components/CalculatePrice';
import Login from './components/Login';
import Register from './components/Register';
import History from './components/History';

function App() {
  document.title = 'ScooTeq';

  const [loggedIn, setLoggedIn] = useState(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
  });

  const handleLogin = (loggedIn: boolean) => {
    setLoggedIn(loggedIn);
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  };

  return (
    <BrowserRouter>
      <Routes>
        <>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </>
        {loggedIn ? (
          <>
            <Route path="/" element={<ChooseAction />} />
            <Route path="/prices" element={<CalculatePrice />} />
            <Route path="/history" element={<History />} />
          </>
        ) : (
          <>
            <Route path="/" element={<a href="/login">Go to Login</a>} />
            <Route path="/prices" element={<a href="/login">Go to Login</a>} />
            <Route path="/history" element={<a href="/login">Go to Login</a>} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
