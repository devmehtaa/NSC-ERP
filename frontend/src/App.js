import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios'
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import Home from './pages/Home';
import Suppliers from './pages/Suppliers';
import SupplierDetail from './pages/SupplierDetail';
import SupplierCreate from './pages/SupplierCreate';

axios.defaults.withCredentials = true;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in based on session
    axios.get('http://localhost:8000/api/check_login/')
      .then(response => {
        setLoggedIn(response.data.loggedIn);
      })
      .catch(() => {
        setLoggedIn(false);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/suppliers' element={<Suppliers/>}/>
        <Route path='/suppliers/:id' element={<SupplierDetail/>}/>
        <Route path='/suppliers/create' element={<SupplierCreate/>}/>
      </Routes>
    </Router>
  );
}

export default App;
