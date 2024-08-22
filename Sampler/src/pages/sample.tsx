import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Button, Typography, Box, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";

import DefaultLayout from "@/layouts/default";
import EntryDetailsModal from "@/components/entrydetails";
import SamplingScreen from "@/components/new_record";

interface EntryDetails {
  entry_id: string;
  vehicle_no: string;
  challan_quantity_MT: number;
}

const DataTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEntryModal, setOpenEntryModal] = useState(false);
  const [openSamplingModal, setOpenSamplingModal] = useState(false);
  const [selectedData, setSelectedData] = useState<EntryDetails | null>(null);

  const navigate = useNavigate();

  const columns = [
    { field: "entry_id", headerName: "Entry Id", width: 120 },
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
      renderCell: (params: any) => (
        <Button
          color="primary"
          variant="contained"
          onClick={(e) => handleButtonClick(e, params.row.entry_id)}
        >
          Check
        </Button>
      ),
    },
  ];

  const handleButtonClick = (e: React.MouseEvent, entryId: string) => {
    e.stopPropagation();
    navigate(`/predict/${entryId}`);
  };

  const handleRowClick = (params: any) => {
    setSelectedData(params.row);
    setOpenEntryModal(true);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/weighbridge-data"
      );
      const dataWithId = response.data.map(
        (row: { id?: any }, index: number) => ({
          id: row.id || index + 1,
          ...row,
        })
      );
      const sortedData = dataWithId.sort(
        (a: { id: number }, b: { id: number }) => b.id - a.id
      );

      setRows(sortedData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCloseEntryModal = () => {
    setOpenEntryModal(false);
    setSelectedData(null);
  };

  const handleOpenSamplingModal = () => {
    setOpenSamplingModal(true);
  };

  const handleCloseSamplingModal = () => {
    setOpenSamplingModal(false);
  };

  return (
    <DefaultLayout>
      <Container maxWidth="xl">
        <div className="flex">
          <Typography color="green" variant="h3">
            Truck Data
          </Typography>
          <Button
            color="primary"
            style={{ marginBottom: "16px", marginLeft: "auto" }}
            variant="contained"
            onClick={handleOpenSamplingModal}
          >
            Add New Entry
          </Button>
        </div>
        <div style={{ height: "80vh", width: "100%" }}>
          <DataGrid
            columns={columns}
            loading={loading}
            rows={rows}
            onRowClick={handleRowClick}
          />
        </div>
      </Container>

      {selectedData && (
        <EntryDetailsModal
          open={openEntryModal}
          selectedData={selectedData}
          onClose={handleCloseEntryModal}
        />
      )}

      <Modal
        BackdropProps={{
          style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
        open={openSamplingModal}
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          },
        }}
        onClose={handleCloseSamplingModal}
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
            onClose={handleCloseSamplingModal}
            onSuccess={() => {
              fetchData(); // Refresh the data
              handleCloseSamplingModal(); // Close the modal
            }}
          />
        </Box>
      </Modal>
    </DefaultLayout>
  );
};

export default DataTable;
