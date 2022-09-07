import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Home from "./Views/Home";
import Tracking from "./Views/Tracking"
import NavBar from "./components/NavBar";
import ShippingEstimate from "./Views/ShippingEstimate";
import ShippingTable from "./Views/ShippingTable";
import { TestProduct } from "./Views/TestProduct";
import { DisplayTracking } from "./Views/DisplayTracking"

const stripePromise = loadStripe("pk_test_51LddcRJoLuBft2Abc0hVq2tObHWfNYqtQiVSwL2hnnWK3MYwslg9jyZmT5QUZ7KzSkHjLCmT05RMTito2XrlPBJZ00rej4M2Cm")

function App() {
  return (
    <div className="flex flex-col h-full">
      <Router>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/estimate" element={<ShippingEstimate />} />

          <Route path="/display-estimates" element={<ShippingTable />} />

          <Route path="/tracking" element={<Tracking />} />

          <Route path="/tracking/:carrierCode/:trackingNumber" element={<DisplayTracking />} />

          <Route path="/test-product" element={<TestProduct />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;