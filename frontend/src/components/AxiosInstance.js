import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:8000/api/',  // base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Axios;