import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Box, Button } from '@mui/material';

function DeleteSupplier(){
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try{
            await axios.delete(`http://localhost:8000/api/suppliers/${id}/`, { withCredentials: true });
            navigate('/suppliers')
        }catch (err){
            console.log(err)
        }
    }

    return(
        <Box sx={{ maxWidth: 800, margin: 'auto', textAlign: 'right' }}>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete Supplier
        </Button>
      </Box>
    );
}

export default DeleteSupplier;