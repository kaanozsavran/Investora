import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";

// Geçici boş sayfalar:
const Stocks = () => <div>Hisseler</div>;
const Favorites = () => <div>Favoriler</div>;
const Convert = () => <div>Dönüştürücü</div>;
const About = () => <div>Hakkında</div>;

function App() {
  return (
    <Router>
      <Navbar />
      <Box sx={{ backgroundColor: "#F8F8F2", minHeight: "100vh", padding: 4 }}>
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
