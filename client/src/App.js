import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";

import Home from "./Views/Home";
import Test from "./Views/Test"
import NavBar from "./components/NavBar";
import ShippingEstimate from "./Views/ShippingEstimate";
import ShippingTable from "./Views/ShippingTable";
import {DisplayTracking} from "./components/DisplayTracking"

function App() {

  return (
    <div className="flex flex-col h-full">
      <Router>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/estimate" element={<ShippingEstimate />} />

          <Route path="/display-estimates" element={<ShippingTable />} />

          <Route path="/tracking" element={<Test />} />

          <Route path="/tracking/:carrierCode/:trackingNumber" element={<DisplayTracking />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;