import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, IconButton, Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import axios from 'axios'
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import Home from './pages/Home';
import Suppliers from './pages/Suppliers';
import SupplierDetail from './pages/SupplierDetail';
import SupplierCreate from './pages/SupplierCreate';
import EditSupplier from './pages/EditSupplier';

axios.defaults.withCredentials = true;

function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();
  return (
    <IconButton 
      onClick={toggleTheme} 
      color="inherit"
      sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}
    >
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}

function AppContent() {
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
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/suppliers' element={<Suppliers/>}/>
        <Route path='/suppliers/:id' element={<SupplierDetail/>}/>
        <Route path='/suppliers/create' element={<SupplierCreate/>}/>
        <Route path="/suppliers/:id/edit" element={<EditSupplier />} />
      </Routes>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
