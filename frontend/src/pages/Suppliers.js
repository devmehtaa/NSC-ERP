import SideNav from "../components/SideNav";
import GetSupplier from "../components/GetSupplier";

function Suppliers(){

    return(
        <div style={{ display: 'flex' }}>
            <div style={{ width: '250px', backgroundColor: '#333', color: 'white', height: '100vh' }}>
                <SideNav/> 
            </div>     
            <div style={{ flex: 1, padding: '20px' }}>
                <GetSupplier />
            </div>
        </div>  
    )
}

 export default Suppliers;