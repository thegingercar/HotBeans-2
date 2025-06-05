import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ApplicationForm from './components/ApplicationForm';
import ApplicationSuccess from './components/ApplicationSuccess';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<ApplicationForm />} />
          <Route path="/application-success" element={<ApplicationSuccess />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;