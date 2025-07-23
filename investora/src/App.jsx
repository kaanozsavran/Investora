import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LightRays from "./components/LightRays";
import { Box } from "@mui/material";
import "./css/LightRays.css";

// Sayfalar
import HomePage from "./pages/HomePage"; // Artık buradan geliyor
import StockPage from "./pages/StockPage";

// Geçici boş sayfalar:
const Stocks = () => <div>Hisseler</div>;
const Convert = () => <div>Döviz</div>;
const About = () => <div>Hakkında</div>;

function App() {
  return (
    <Router>
      <Navbar />
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#0f0f1f",
        }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stocks" element={<StockPage />} />
          <Route path="/currency" element={<Convert />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
