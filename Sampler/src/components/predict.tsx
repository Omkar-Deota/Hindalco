import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Button, CircularProgress } from "@mui/material";
import axios from "axios";

import WeightChart from "./weightdiffscreen";

import DefaultLayout from "@/layouts/default";
import Charts from "@/components/chart";

interface DataEntry {
  vehicle_no: string;
  delay_minutes: number;
  t_id: string;
  gcv: string;
  moisture: string;
}

interface WeightDiffEntry {
  entry_id: number;
  "(wb.expected_weight_MT-wb.challan_quantity_MT)": number;
}

const DetailsPage = () => {
  const { entry_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataEntry[]>([]);
  const [name, setName] = useState<string | null>(null);
  const [weight, setWeight] = useState<WeightDiffEntry[]>([]);
  const [gcv, setGcv] = useState<any>([]);
  const [pweight, setPweight] = useState<number>(0);
  const [predicting, setPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState<any>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/dashboard/${entry_id}`,
      );
      const weight_diff = await axios.get(
        `http://localhost:3000/weight-diff/${entry_id}`,
      );
      const realGcv = await axios.get(
        `http://localhost:3000/real-gcv/${entry_id}`,
      );

      setGcv(realGcv.data);

      if (weight_diff.data.length > 0) {
        const weightDiffEntry = weight_diff.data.find(
          (entry: WeightDiffEntry) => entry.entry_id === Number(entry_id),
        );

        if (weightDiffEntry) {
          setPweight(
            weightDiffEntry["(wb.expected_weight_MT-wb.challan_quantity_MT)"],
          );
        } else {
          console.error("Entry not found for the specified entry_id.");
        }
      } else {
        console.error(
          "No data found in weight_diff for the specified entry_id.",
        );
      }
      setWeight(weight_diff.data);
      setData(response.data);
      setName(response.data[0]?.t_id);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handlePredictQuality = async () => {
    setPredicting(true);
    try {
      const vehicleNumber = data[0]?.vehicle_no;
      const delay = data[0]?.delay_minutes;
      const weightVariation = pweight;
      const tId = data[0]?.t_id;

      const payload = {
        vehicle_no: vehicleNumber,
        delay: delay,
        weight_variation: weightVariation,
        t_id: tId,
      };

      const response = await axios.post(
        `http://localhost:3000/predict-quality`,
        payload,
      );

      setPredictionResult(response.data);
    } catch (error) {
      console.error("Error predicting quality:", error);
    } finally {
      setPredicting(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [entry_id]);

  return (
    <DefaultLayout>
      <Container maxWidth="md">
        <Typography gutterBottom variant="h6">
          Details for Entry ID: {entry_id}
        </Typography>
        <Typography gutterBottom variant="h6">
          Transporter ID: {name}
        </Typography>
        {!loading && <Charts data={data} realData={gcv} />}
        {!loading && <WeightChart data={weight} />}

        <Button
          color="primary"
          disabled={predicting}
          sx={{ mt: 2 }}
          variant="contained"
          onClick={handlePredictQuality}
        >
          {predicting ? <CircularProgress size={24} /> : "Predict Quality"}
        </Button>

        {predictionResult && (
          <Typography sx={{ mt: 2 }} variant="body1">
            Prediction Result: {JSON.stringify(predictionResult)}
          </Typography>
        )}
      </Container>
    </DefaultLayout>
  );
};

export default DetailsPage;
