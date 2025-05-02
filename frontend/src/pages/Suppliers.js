import SideNav from "../components/SideNav";
import GetSupplier from "../components/GetSupplier";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function Suppliers(){

    const navigate = useNavigate();

    return(
        <div style={{ display: 'flex' }}>
            <div style={{ width: '250px', backgroundColor: '#333', color: 'white', height: '100vh' }}>
                <SideNav/> 
            </div>     
            <div style={{ flex: 1, padding: '20px', position: 'relative' }}>
                {/* Material Design Button */}
                <Button
                    variant="contained" // Gives the button a filled style
                    color="primary" // Sets the button color (you can change this to "secondary" or any color you want)
                    style={{
                        position: 'absolute',
                        top: '20px', // distance from the top
                        right: '20px', // distance from the right
                    }}
                    onClick={() => navigate('/suppliers/create')}
                >
                    Create New Supplier
                </Button>

                <GetSupplier />
            </div>
        </div>  
    )
}

 export default Suppliers;