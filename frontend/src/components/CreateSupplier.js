import axios from "axios";
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function CreateSupplierForm() {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        website: '',
        main_person: '', // assuming the main person will be an ID of a ContactPerson
    });

    const navigate = useNavigate();

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
            const res = await axios.post('http://localhost:8000/api/suppliers/', formData, { withCredentials: true });
            console.log("Supplier created successfully:", res.data);
            navigate('/suppliers');
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
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
                label="Main Person ID(pk)"
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
                Create Supplier
            </Button>
        </form>
    );
}

export default CreateSupplierForm;
