import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Charts = ({ data, realData }: { data: any; realData: any }) => {
  const gcvValues = data.map((item: { gcv: string }) => parseFloat(item.gcv));
  const moistureValues = data.map((item: { moisture: string }) =>
    parseFloat(item.moisture),
  );
  const delayValues = data.map((item: { delay_minutes: string }) =>
    parseInt(item.delay_minutes, 10),
  );
  const realGcv = realData.map((item: { gcv_range: string }) =>
    parseFloat(item.gcv_range),
  );


  const labels = data.map((item: { vehicle_no: string }) => item.vehicle_no);

  const gcvData = {
    labels,
    datasets: [
      {
        label: "GCV",
        data: gcvValues,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "GCV Range",
        data: realGcv,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  const moistureData = {
    labels,
    datasets: [
      {
        label: "Moisture",
        data: moistureValues,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
      },
    ],
  };

  const delayData = {
    labels,
    datasets: [
      {
        label: "Delay (Minutes)",
        data: delayValues,
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h2>GCV Chart</h2>
      <Line data={gcvData} />

      <h2>Moisture Chart</h2>
      <Line data={moistureData} />

      <h2>Delay Minutes Chart</h2>
      <Line data={delayData} />
    </div>
  );
};

export default Charts;
