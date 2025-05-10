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
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteSupplier from './DeleteSupplier';
import AddContact from './AddContact';
import AddProduct from './AddProduct';

function GetSupplierDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [showAddContactForm, setShowAddContactForm] = useState(false);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const fetchSupplier = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/suppliers/${id}/`, {
        withCredentials: true
      });
      setSupplier(response.data);
    } catch (error) {
      console.error('Error fetching supplier:', error);
    }
  };

  useEffect(() => {
    fetchSupplier();
  }, [id]);

  if (!supplier) return <Typography variant="h6">Loading supplier details...</Typography>;

  const handleEdit = () => navigate(`/suppliers/${id}/edit`);

  
  const handleEditContact = (contact) => {
    console.log("Editing contact:", contact);
    setEditingContact(contact);
    setShowAddContactForm(true);
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Supplier Info */}
      <Card elevation={3} sx={{ maxWidth: 800, margin: 'auto', mb: 4 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography variant="h4" gutterBottom>
                {supplier?.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Address:</strong> {supplier.address || 'N/A'}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Website:</strong>{' '}
                <Link href={supplier.website} target="_blank" rel="noopener">
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
      <Card elevation={3} sx={{ maxWidth: 800, margin: 'auto', mb: 4 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5">Contacts</Typography>
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
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleEditContact(c)} 
                      >
                        Edit
                      </Button>
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
            <Typography variant="body2">No contacts available.</Typography>
          )}

          {showAddContactForm && (
            <AddContact
              supplierId={supplier.id}
              existingContact={editingContact}  
              onSuccess={() => {
                setShowAddContactForm(false);
                setEditingContact(null);       
                fetchSupplier();
              }}
            />
          )}
        </CardContent>
      </Card>

      {/* Products Section */}
      <Card elevation={3} sx={{ maxWidth: 800, margin: 'auto' }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5">Products</Typography>
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
                  <ListItem>
                    <ListItemText
                      primary={p.name}
                      secondary={`Description: ${p.description || 'N/A'} | Unit: ${
                        p.unit
                      } | Price: $${p.price} | Available: ${p.availability ? 'Yes' : 'No'}`}
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          ) : (
            <Typography variant="body2">No products listed.</Typography>
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
