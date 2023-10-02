import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">

            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/:language" element={<Navbar />} >
                    <Route path={`cancellation`} element={<CancellationTaskForm />} />
                    <Route path={`sequencing`} element={<SequencingTaskForm />} />
                    <Route path={`problem`} element={<ProblemTaskForm />} />
                    <Route path={`association`} element={<AssociationTaskForm />} />
                    <Route path={`context`} element={<ContextTaskForm />} />
                    <Route path={`categorization`} element={<CategorizationTaskForm />} />
                    <Route path={`actionsequencing`} element={<ActionSequencingTaskForm />} />
                    <Route path={`imagepairs`} element={<ImagePairsTaskForm />} />
                    <Route path={`maze`} element={<MazeTaskForm />} />
                    <Route path={`wordSoup`} element={<SoupTaskForm />} />
                    <Route path={`memoryRecall`} element={<MemoryRecallTaskForm />} />
                    <Route path={`profile`} element={<ProfileTaskForm />} />
                </Route>
            </Routes>

    </div>
  );
}

export default App;
