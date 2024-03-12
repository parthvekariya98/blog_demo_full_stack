import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/About';
import BlogDetails from './components/BlogDetails';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blogdetails/:id" element={<BlogDetails />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
