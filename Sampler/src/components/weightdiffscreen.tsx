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

const WeightChart = ({ data }: any) => {
  // Extract weight differences and vehicle numbers from the API data
  const diffValues = data.map(
    (item: { "(wb.expected_weight_MT-wb.challan_quantity_MT)": number }) =>
      item["(wb.expected_weight_MT-wb.challan_quantity_MT)"]
  );

  const labels = data.map((item: { vehicle_no: string }) => item.vehicle_no);

  const diffValue = {
    labels, // X-axis labels (vehicle numbers)
    datasets: [
      {
        label: "Weight Difference (MT)",
        data: diffValues, // Y-axis data (weight differences)
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h2>Weight Difference (MT) by Vehicle Number</h2>
      <Line data={diffValue} />
    </div>
  );
};

export default WeightChart;
