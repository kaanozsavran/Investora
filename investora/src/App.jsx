import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import LightRays from "./components/LightRays";
import { Box } from "@mui/material";
import "./css/LightRays.css";

// Geçici boş sayfalar:
const Stocks = () => <div>Hisseler</div>;
const Favorites = () => <div>Favoriler</div>;
const Convert = () => <div>Dönüştürücü</div>;
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
          backgroundColor: "#0f0f1f", // koyu gece rengi gibi bir ton
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
          <Route path="/" element={<Dashboard />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/convert" element={<Convert />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
