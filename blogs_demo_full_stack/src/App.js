import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlogDetails from './components/BlogDetails';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blogdetails/:id" element={<BlogDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
