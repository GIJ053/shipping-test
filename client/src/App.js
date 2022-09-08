import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Home from "./Views/Home";
import Tracking from "./Views/ShipEngine/Tracking"
import NavBar from "./components/NavBar";
import ShippingEstimate from "./Views/ShipEngine/ShippingEstimate";
import ShippingTable from "./Views/ShipEngine/ShippingTable";
import { DisplayTracking } from "./Views/ShipEngine/DisplayTracking"
import { TestProduct } from "./Views/Stripe/TestProduct";
import { Success } from "./Views/Stripe/Success"
import { CreateAccount } from "./Views/Stripe/CreateAccount"
import { DisplayAccount } from "./Views/Stripe/DisplayAccount"
import { SimulatePurchase } from "./Views/Stripe/SimulatePurchase"

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

          <Route path="/success" element={<Success />} />

          <Route path="/create-stripe" element={<CreateAccount />} />

          <Route path="/display-stripe" element={<DisplayAccount />} />

          <Route path="/sim-purchase" element={<SimulatePurchase />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;