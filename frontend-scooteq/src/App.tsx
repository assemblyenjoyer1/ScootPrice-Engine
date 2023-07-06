import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import ChooseAction from './components/Home';
import CalculatePrice from './components/CalculatePrice';
import Login from './components/Login';
import Register from './components/Register';
import History from './components/History';

function App() {
    document.title = 'ScooTeq';


    return (
        <BrowserRouter>
            <Routes>
                <>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<ChooseAction/>}/>
                    <Route path="/prices" element={<CalculatePrice/>}/>
                    <Route path="/history" element={<History/>}/>
                </>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
