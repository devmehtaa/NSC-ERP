// src/pages/Login.js
import { useState } from 'react';
import axios from 'axios';
import { saveTokens } from '../components/Auth';

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });
      const { access, refresh } = res.data;
      saveTokens(access, refresh); 
      setLoggedIn(true);
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
