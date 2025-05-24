import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function DeleteProduct({ productId, onSuccess }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${productId}/`, {
        withCredentials: true
      });
      handleClose();
      onSuccess();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        size="small"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >
        Delete
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteProduct; 