import axios from "axios";
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography } from '@mui/material';

function EditSupplier() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        website: '',
        main_person: '',
    });

    // Fetch existing supplier data
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

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
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

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
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
    );
}

export default EditSupplier; 