import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import ChooseAction from "./components/Home";
import CalculatePrice from "./components/CalculatePrice";

function App() {
    document.title = 'ScooTeq'
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ChooseAction/>}/>
                <Route path="/prices" element={<CalculatePrice/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
