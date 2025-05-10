import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function EditSupplier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    website: '',
    main_person: '',
  });

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/suppliers/${id}/`, {
          withCredentials: true
        });
        setFormData({
          name: response.data.name || '',
          address: response.data.address || '',
          website: response.data.website || '',
          main_person: response.data.main_person || '',
        });
      } catch (error) {
        console.error('Error fetching supplier:', error);
      }
    };
    fetchSupplier();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/suppliers/${id}/`, formData, {
        withCredentials: true
      });
      navigate(`/suppliers/${id}`);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleBack = () => navigate(`/suppliers/${id}`);

  return (
    <Box sx={{ padding: 4 }}>
      <Button 
        variant="outlined" 
        onClick={handleBack} 
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to Supplier
      </Button>

      <Box sx={{ maxWidth: 600, margin: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          Edit Supplier
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Supplier Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="Address"
            variant="outlined"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="Website"
            variant="outlined"
            name="website"
            value={formData.website}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="Main Person ID"
            variant="outlined"
            name="main_person"
            value={formData.main_person}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '16px' }}
          >
            Update Supplier
          </Button>
        </form>
      </Box>
    </Box>
  );
}
