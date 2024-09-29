// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Home from './components/Home';
import Register from './components/registerForm';
import EmployeeList from './components/EmployeeList';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/employees" element={<EmployeeList/>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
