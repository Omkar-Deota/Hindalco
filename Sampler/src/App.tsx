import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import TransportPage from "@/pages/transporter";
import SamplePage from "@/pages/sample";

import DetailsPage from "./components/predict";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<TransportPage />} path="/transporter" />
      <Route element={<SamplePage />} path="/sample" />
      <Route element={<DetailsPage />} path="/predict/:entry_id" />
    </Routes>
  );
}

export default App;
