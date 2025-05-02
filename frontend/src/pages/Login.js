// src/pages/Login.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send the username and password to Django backend for session authentication
      await axios.post('http://localhost:8000/api/login/', {
        username,
        password,
      }, { withCredentials: true });

      setLoggedIn(true);
      navigate('/home');
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
        <form onSubmit={handleLogin}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>

          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>

          <Button
            variant="text"
            color="secondary"
            fullWidth
            sx={{ marginTop: 1 }}
            onClick={() => navigate('/register')}
          >
            Don't have an account? Sign up
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;
