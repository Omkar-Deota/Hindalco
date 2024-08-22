import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import axios from "axios";

import DefaultLayout from "@/layouts/default";
import Charts from "@/components/chart";

import WeightChart from "./weightdiffscreen";

const DetailsPage = () => {
  const { entry_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [name, setName] = useState(null);
  const [weight, setWeight] = useState(0);
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/dashboard/${entry_id}`);
      const weight_diff = await axios.get(
        `http://localhost:3000/weight-diff/${entry_id}`,
      );

      setWeight(weight_diff.data);
      console.log(weight_diff.data); // eslint-disable-line no-console
      setData(response.data);
      setName(response.data[0]?.t_id);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
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
          Transporter name: {name}
        </Typography>
        {!loading && <Charts data={data} />}
        {!loading && <WeightChart data={weight} />}
      </Container>
    </DefaultLayout>
  );
};

export default DetailsPage;
