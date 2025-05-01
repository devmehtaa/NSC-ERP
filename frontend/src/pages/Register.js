import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/register/', {
        username,
        password
      });
      alert('User registered! Now log in.', res);
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={registerUser}>
      <h2>Register</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
