import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAccessToken, logout } from '../components/Auth';

function Logout() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/logout/', {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
    .then(res => setData(res.data))
    .catch(() => alert('Unauthorized'));
  }, []);

  return (
    <div>
      <h2>Logout</h2>
      {data ? <p>{JSON.stringify(data)}</p> : <p>Loading...</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Logout;
