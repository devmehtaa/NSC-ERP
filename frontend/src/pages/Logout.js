import Axios from '../components/AxiosInstance';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send the logout request with credentials included
      await Axios.post('http://localhost:8000/api/logout/', {}, { withCredentials: true });
      console.log('Logout successful');
      navigate('/login')
      // Redirect user or update state here
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
