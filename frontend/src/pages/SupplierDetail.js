import { Card, CardContent, Button, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';
import GetSupplierDetail from '../components/GetSupplierDetail';

function SupplierDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBack = () => navigate('/suppliers');
  const handleEdit = () => navigate(`/suppliers/${id}/edit`);

  return (
    <div>
      <Button variant="outlined" onClick={handleBack} startIcon={<ArrowBackIcon />}>
        Back to Menu
      </Button>

      <Box sx={{ mt: 2 }}>
        <GetSupplierDetail />
      </Box>
    </div>
  );
}

export default SupplierDetail;
