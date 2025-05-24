import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Button,
  TextField,
  Snackbar,
  Alert,
  Stack,
  useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteSupplier from './DeleteSupplier';
import DeleteContact from './DeleteContact';
import DeleteProduct from './DeleteProduct';
import AddContact from './AddContact';
import AddProduct from './AddProduct';

function GetSupplierDetail() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [showAddContactForm, setShowAddContactForm] = useState(false);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productFormData, setProductFormData] = useState({
    name: '',
    description: '',
    unit: '',
    price: '',
    availability: true,
  });
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const fetchSupplier = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/suppliers/${id}/`, {
        withCredentials: true
      });
      setSupplier(response.data);
    } catch (error) {
      console.error('Error fetching supplier:', error);
      showNotification('Error fetching supplier details', 'error');
    }
  };

  useEffect(() => {
    fetchSupplier();
  }, [id]);

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (!supplier) return <Typography variant="h6">Loading supplier details...</Typography>;

  const handleEdit = () => navigate(`/suppliers/${id}/edit`);
  
  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowAddContactForm(true);
  };

  const handleCancelContactEdit = () => {
    setEditingContact(null);
    setShowAddContactForm(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product.id);
    setProductFormData({
      name: product.name || '',
      description: product.description || '',
      unit: product.unit || '',
      price: product.price || '',
      availability: product.availability || true,
    });
  };

  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log the data being sent
      console.log('Sending update for product:', editingProduct);
      console.log('Update data:', {
        ...productFormData,
        price: parseFloat(productFormData.price),
      });

      const response = await axios.put(
        `http://localhost:8000/api/products/${editingProduct}/`,
        {
          ...productFormData,
          price: parseFloat(productFormData.price),
          supplier: supplier.id // Add supplier ID to the request
        },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      console.log('Update response:', response.data);
      showNotification('Product updated successfully');
      setEditingProduct(null);
      fetchSupplier();
    } catch (err) {
      console.error('Error updating product:', err);
      console.error('Error response:', err.response?.data);
      showNotification(
        err.response?.data?.detail || 
        err.response?.data?.message || 
        'Failed to update product. Please check the console for details.',
        'error'
      );
    }
  };

  return (
    <Box sx={{ 
      padding: 4,
      minHeight: '100vh',
      bgcolor: 'background.default',
      color: 'text.primary'
    }}>
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>

      {/* Supplier Info */}
      <Card elevation={3} sx={{ 
        maxWidth: 800, 
        margin: 'auto', 
        mb: 4,
        bgcolor: 'background.paper'
      }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography variant="h4" gutterBottom color="text.primary">
                {supplier?.name}
              </Typography>
              <Typography variant="body1" gutterBottom color="text.secondary">
                <strong>Address:</strong> {supplier.address || 'N/A'}
              </Typography>
              <Typography variant="body1" gutterBottom color="text.secondary">
                <strong>Website:</strong>{' '}
                <Link href={supplier.website} target="_blank" rel="noopener" color="primary">
                  {supplier.website || 'N/A'}
                </Link>
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleEdit}
            >
              Edit Supplier
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Contacts Section */}
      <Card elevation={3} sx={{ 
        maxWidth: 800, 
        margin: 'auto', 
        mb: 4,
        bgcolor: 'background.paper'
      }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" color="text.primary">Contacts</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setEditingContact(null); 
                setShowAddContactForm(true);
              }}
            >
              Add Contact
            </Button>
          </Box>

          {supplier.contacts.length > 0 ? (
            <List>
              {supplier.contacts.map((c) => (
                <div key={c.id}>
                  <ListItem
                    secondaryAction={
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleEditContact(c)} 
                        >
                          Edit
                        </Button>
                        <DeleteContact 
                          contactId={c.id} 
                          onSuccess={fetchSupplier}
                        />
                      </Stack>
                    }
                  >
                    <ListItemText
                      primary={c.name}
                      secondary={`Email: ${c.email || 'N/A'} | Phone: ${
                        c.phone || 'N/A'
                      } | Designation: ${c.designation || 'N/A'}`}
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">No contacts available.</Typography>
          )}

          {showAddContactForm && (
            <Box sx={{ 
              mt: 2, 
              p: 2, 
              bgcolor: 'background.paper', 
              borderRadius: 1,
              border: `1px solid ${theme.palette.divider}`
            }}>
              <AddContact
                supplierId={supplier.id}
                existingContact={editingContact}  
                onSuccess={() => {
                  setShowAddContactForm(false);
                  setEditingContact(null);       
                  fetchSupplier();
                }}
                onCancel={handleCancelContactEdit}
              />
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Products Section */}
      <Card elevation={3} sx={{ 
        maxWidth: 800, 
        margin: 'auto',
        bgcolor: 'background.paper'
      }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" color="text.primary">Products</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowAddProductForm(true)}
            >
              Add Product
            </Button>
          </Box>

          {supplier.products.length > 0 ? (
            <List>
              {supplier.products.map((p) => (
                <div key={p.id}>
                  <ListItem
                    secondaryAction={
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleEditProduct(p)}
                        >
                          Edit
                        </Button>
                        <DeleteProduct 
                          productId={p.id} 
                          onSuccess={fetchSupplier}
                        />
                      </Stack>
                    }
                  >
                    <ListItemText
                      primary={p.name}
                      secondary={`Description: ${p.description || 'N/A'} | Unit: ${
                        p.unit
                      } | Price: $${p.price} | Available: ${p.availability ? 'Yes' : 'No'}`}
                    />
                  </ListItem>
                  {editingProduct === p.id && (
                    <Box sx={{ 
                      mt: 2, 
                      mb: 2, 
                      p: 2, 
                      bgcolor: 'background.paper', 
                      borderRadius: 1,
                      border: `1px solid ${theme.palette.divider}`
                    }}>
                      <form onSubmit={handleProductSubmit}>
                        <TextField
                          fullWidth
                          label="Product Name"
                          name="name"
                          value={productFormData.name}
                          onChange={handleProductChange}
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="Description"
                          name="description"
                          value={productFormData.description}
                          onChange={handleProductChange}
                          margin="normal"
                          multiline
                          rows={3}
                        />
                        <TextField
                          fullWidth
                          label="Unit"
                          name="unit"
                          value={productFormData.unit}
                          onChange={handleProductChange}
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="Price"
                          name="price"
                          type="number"
                          value={productFormData.price}
                          onChange={handleProductChange}
                          margin="normal"
                          required
                          inputProps={{ step: "0.01", min: "0" }}
                        />
                        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                          >
                            Update Product
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => setEditingProduct(null)}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </form>
                    </Box>
                  )}
                  <Divider />
                </div>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">No products listed.</Typography>
          )}

          {showAddProductForm && (
            <AddProduct
              supplierId={supplier.id}
              onSuccess={() => {
                setShowAddProductForm(false);
                fetchSupplier();
              }}
            />
          )}
        </CardContent>
      </Card>

      {/* Delete Supplier Button */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <DeleteSupplier />
      </Box>
    </Box>
  );
}

export default GetSupplierDetail;
