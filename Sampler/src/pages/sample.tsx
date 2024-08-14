import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Button, Modal, Box, Typography } from "@mui/material";

import DefaultLayout from "@/layouts/default";
import SamplingScreen from "@/components/new_record";

const DataTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  // Define the columns for the DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "vehicle_no", headerName: "Vehicle No", flex: 1, minWidth: 150 },
    {
      field: "challan_quantity_MT",
      headerName: "Challan Quantity (MT)",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "gross_weight_MT",
      headerName: "Gross Weight (MT)",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "expected_weight_MT",
      headerName: "Expected Weight (MT)",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: () => (
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleCheck()}
        >
          Check
        </Button>
      ),
    },
  ];

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:3000/weighbridge-data",
      );
      const dataWithId = response.data.map(
        (row: { id?: any }, index: number) => {
          const { id, ...rest } = row; // Destructure id and rest of the properties

          return {
            id: id || index + 1,
            ...rest,
          };
        },
      );

      // Sort data by id in descending order (most recent first)
      const sortedData = dataWithId.sort(
        (a: { id: number }, b: { id: number }) => b.id - a.id,
      );

      setRows(sortedData);
      setLoading(false);
    } catch (error) {
      // console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheck = () => {
    alert("Checked row:");
    // Handle your check logic here
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSuccess = () => {
    handleCloseModal();
    fetchData();
  };

  return (
    <DefaultLayout>
      <Container maxWidth="xl">
        <div className="flex ">
          <Typography color="green" variant="h3">
            Truck Data
          </Typography>
          <Button
            color="primary"
            style={{ marginBottom: "16px", marginLeft: "auto" }}
            variant="contained"
            onClick={handleOpenModal}
          >
            Add New Entry
          </Button>
        </div>
        <div style={{ height: "80vh", width: "100%" }}>
          <DataGrid columns={columns} loading={loading} rows={rows} />
        </div>
      </Container>

      <Modal
        BackdropProps={{
          style: { backgroundColor: "rgba(0, 0, 0, 0.5)" }, // Customize backdrop color (optional)
        }}
        open={openModal}
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Ensures the backdrop doesn’t override the theme
          },
        }}
        onClose={handleCloseModal}
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
          <SamplingScreen
            onClose={handleCloseModal}
            onSuccess={handleSuccess}
          />
        </Box>
      </Modal>
    </DefaultLayout>
  );
};

export default DataTable;
