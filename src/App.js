import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">

            <Routes>
                
                <Route path="/:language" element={<Navbar />} />
            </Routes>

    </div>
  );
}

export default App;
