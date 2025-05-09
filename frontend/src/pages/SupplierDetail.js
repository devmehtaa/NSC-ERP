import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GetSupplierDetail from "../components/GetSupplierDetail";

function SupplierDetail() {
  const navigate = useNavigate(); 

  const handleBack = () => {
    navigate("/suppliers");
  };

  return (
    <div>
      {/* Back Button */}
      <div style={{ padding: "16px" }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Back to Menu
        </Button>
      </div>

      {/* Supplier Details */}
      <div style={{ padding: "16px" }}>
        <GetSupplierDetail />
      </div>
    </div>
  );
}

export default SupplierDetail;
