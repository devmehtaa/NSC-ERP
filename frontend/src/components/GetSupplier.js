import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';



function GetSupplier() {
    console.log("rendered!")
    const [supplier, setSuppliers] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchSuppliers = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/suppliers/', {
            withCredentials: true  
          });
          setSuppliers(response.data);
          console.log(supplier)
        } catch (error) {
          console.error('Failed to fetch suppliers', error);
        }
      };
      fetchSuppliers();
    }, []);

    return(
        <div>
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Supplier Name</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {supplier.map((sup) => (
            <TableRow key={sup.id} hover>
              <TableCell>
                <Link
                  component="button"
                  variant="body1"
                onClick={() => navigate(`/suppliers/${sup.id}`)}
                  underline="hover"
                >
                  {sup.name}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    );
}

export default GetSupplier;