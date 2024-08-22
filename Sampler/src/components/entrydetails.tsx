import React, { useState } from "react";
import { Modal, Box, Typography, Button, Tabs, Tab } from "@mui/material";

import NextModal from "@/components/delay_performance";

interface EntryDetailsModalProps {
  open: boolean;
  onClose: () => void;
  selectedData: {
    entry_id: string;
    vehicle_no: string;
    challan_quantity_MT: number;
  } | null;
}

const EntryDetailsModal: React.FC<EntryDetailsModalProps> = ({
  open,
  onClose,
  selectedData,
}) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Modal
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      }}
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Entry Details" />
          <Tab label="Performance" />
        </Tabs>

        {tabValue === 0 && selectedData && (
          <Box sx={{ padding: "16px" }}>
            <Typography>ID: {selectedData.entry_id}</Typography>
            <Typography>Vehicle No: {selectedData.vehicle_no}</Typography>
            <Typography>
              Challan Quantity: {selectedData.challan_quantity_MT} MT
            </Typography>
          </Box>
        )}
        {tabValue === 1 && selectedData && (
          <NextModal entry_id={selectedData.entry_id} />
        )}

        <Button
          color="primary"
          style={{ marginTop: "16px" }}
          variant="contained"
          onClick={onClose}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default EntryDetailsModal;
