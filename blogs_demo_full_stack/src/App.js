import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/About';
import BlogDetails from './components/BlogDetails';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<><Header /><Dashboard /></>} />
        <Route path="/blogdetails/:id" element={<><Header /><BlogDetails /></>} />
        <Route path='/about' element={<><Header /><About /></>} />
        <Route path='/contact' element={<><Header /><Contact /></>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
