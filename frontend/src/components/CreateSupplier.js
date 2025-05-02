import Axios from "./AxiosInstance";

const createSupplier = async (supplierData) => {
    try{
        res = await axios.post('suppliers/', supplierData)
        console.log("supplier created")
    }catch(err){
        console.error(err)
    }
};
