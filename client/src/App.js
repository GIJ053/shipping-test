import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";

import Home from "./Views/Home";
import Test from "./Views/Test"
import NavBar from "./components/NavBar";
import ShippingEstimate from "./Views/ShippingEstimate";

function App() {

  return (
    <div className="flex flex-col h-full">
      <Router>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/test" element={<Test />} />

          <Route path="/estimate" element={<ShippingEstimate />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;