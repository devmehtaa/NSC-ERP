import { TextField, Button, Box, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

function AddProduct({ supplierId, onSuccess }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        unit: '',
        price: '',
        availability: true,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const value = e.target.name === 'availability' ? e.target.checked : e.target.value;
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await axios.post(
                'http://localhost:8000/api/products/',
                {
                    ...formData,
                    supplier: supplierId,
                    price: parseFloat(formData.price),
                },
                { withCredentials: true }
            );
            setSuccess('Product added successfully!');
            setFormData({ name: '', description: '', unit: '', price: '', availability: true });
            setTimeout(() => {
                setSuccess('');
                onSuccess();
            }, 2000);
        } catch (err) {
            setError('Failed to add product. Please check your inputs and try again.');
            console.error(err);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                Add New Product
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Product Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    margin="normal"
                    multiline
                    rows={3}
                />
                <TextField
                    fullWidth
                    label="Unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    margin="normal"
                    required
                    inputProps={{ step: "0.01", min: "0" }}
                />

                {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
                {success && <Typography color="primary" sx={{ mt: 1 }}>{success}</Typography>}

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Add Product
                </Button>
            </form>
        </Box>
    );
}

export default AddProduct; 