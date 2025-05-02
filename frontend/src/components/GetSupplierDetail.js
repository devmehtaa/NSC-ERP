import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Card,CardContent,Typography,Link,Grid,List,ListItem,ListItemText,Divider,Box, Button} from '@mui/material';
import DeleteSupplier from './DeleteSupplier';

function GetSupplierDetail() {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/suppliers/${id}/`, { withCredentials: true });
        console.log('Supplier Data:', response.data);
        setSupplier(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching supplier:', error);
      }
    };

    fetchSupplier();
  }, [id]);

  if (!supplier) return <Typography variant="h6">Loading supplier details...</Typography>;

  return (
    <Box sx={{ padding: 4 }}>
      <Card elevation={3} sx={{ maxWidth: 800, margin: 'auto', mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {supplier.name}
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
        </CardContent>
      </Card>

      {/* Contacts Section */}
      <Card elevation={3} sx={{ maxWidth: 800, margin: 'auto', mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Contacts
          </Typography>
          {supplier.contacts.length > 0 ? (
            <List>
              {supplier.contacts.map((c) => (
                <div key={c.id}>
                  <ListItem>
                    <ListItemText
                      primary={c.name}
                      secondary={`Email: ${c.email || 'N/A'} | Phone: ${c.phone || 'N/A'} | Designation: ${c.designation || 'N/A'}`}
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          ) : (
            <Typography variant="body2">No contacts available.</Typography>
          )}
        </CardContent>
      </Card>

      {/* Products Section */}
      <Card elevation={3} sx={{ maxWidth: 800, margin: 'auto' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Products
          </Typography>
          {supplier.products.length > 0 ? (
            <List>
              {supplier.products.map((p) => (
                <div key={p.id}>
                  <ListItem>
                    <ListItemText
                      primary={p.name}
                      secondary={`Description: ${p.description || 'N/A'} | Unit: ${p.unit} | Price: $${p.price} | Available: ${p.availability ? 'Yes' : 'No'}`}
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          ) : (
            <Typography variant="body2">No products listed.</Typography>
          )}
        </CardContent>
      </Card>
      {/* delete button */}
      <DeleteSupplier/>
      {/* delete button  */}
    </Box>
  );
}

export default GetSupplierDetail;
