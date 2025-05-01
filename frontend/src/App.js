import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import { getAccessToken } from './components/Auth';

function App() {
  const [loggedIn, setLoggedIn] = useState(getAccessToken() ? true : false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={loggedIn ? <Logout /> : <p>Please log in</p>} />
      </Routes>
    </Router>
  );
}

export default App;
