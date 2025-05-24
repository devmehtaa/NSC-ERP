import { TextField, Button, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

function AddContact({ supplierId, onSuccess, existingContact, onCancel }) {
  const [formData, setFormData] = useState({
    name: existingContact?.name || '',
    email: existingContact?.email || '',
    phone: existingContact?.phone || '',
    designation: existingContact?.designation || '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (existingContact) {
      setFormData({
        name: existingContact.name || '',
        email: existingContact.email || '',
        phone: existingContact.phone || '',
        designation: existingContact.designation || '',
      });
    } else {
      // 🔸 Reset form when switching to add mode
      setFormData({
        name: '',
        email: '',
        phone: '',
        designation: '',
      });
    }
  }, [existingContact]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (existingContact && existingContact.id) {
        // 🔸 Edit mode: update the contact
        await axios.put(
          `http://localhost:8000/api/contactpersons/${existingContact.id}/`,
          {
            ...formData,
            supplier: supplierId,
          },
          { withCredentials: true }
        );
        setSuccess('Contact updated successfully!');
      } else {
        // 🔸 Create mode: add new contact
        await axios.post(
          'http://localhost:8000/api/contactpersons/',
          {
            ...formData,
            supplier: supplierId,
          },
          { withCredentials: true }
        );
        setSuccess('Contact added successfully!');
        setFormData({ name: '', email: '', phone: '', designation: '' });
      }
      setTimeout(() => {
        setSuccess('');
        onSuccess();
      }, 2000);
    } catch (err) {
      setError('Failed to save contact. Check inputs and try again.');
      console.error(err);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      {/* 🔸 Dynamic title */}
      <Typography variant="h6" gutterBottom>
        {existingContact ? 'Edit Contact Person' : 'Add Contact Person'}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          margin="normal"
        />

        {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        {success && <Typography color="primary" sx={{ mt: 1 }}>{success}</Typography>}

        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            {existingContact ? 'Update Contact' : 'Add Contact'}
          </Button>
          <Button
            variant="outlined"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default AddContact;
