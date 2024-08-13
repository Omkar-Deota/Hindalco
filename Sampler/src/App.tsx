import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import TransportPage from "@/pages/transporter";
import SamplePage from "@/pages/sample";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<TransportPage />} path="/transporter" />
      <Route element={<SamplePage />} path="/sample" />
    </Routes>
  );
}

export default App;
