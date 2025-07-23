import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LightRays from "./components/LightRays";
import { Box } from "@mui/material";
import "./css/LightRays.css";
import TextType from "./components/TextType";
import "./css/TextType.css";
import BlurText from "./components/BlurText";
import "./css/BlurText.css";
import GetStartedButton from "./components/GetStartedButton";
import LearnMoreButton from "./components/LearnMoreButton";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

// Geçici boş sayfalar:
const Stocks = () => <div>Hisseler</div>;
const Favorites = () => <div>Favoriler</div>;
const Convert = () => <div>Dönüştürücü</div>;
const About = () => <div>Hakkında</div>;

// Ana sayfa komponenti - yazıları burada göster
const HomePage = () => {
  // Buton fonksiyonları
  const handleGetStarted = () => {
    console.log("Get Started clicked!");
    // Buraya istediğin işlemi yaz:
    // - Kayıt sayfasına yönlendir
    // - Modal aç
    // - Dashboard'a git vb.
  };

  const handleLearnMore = () => {
    console.log("Learn More clicked!");
    // Buraya istediğin işlemi yaz:
    // - About sayfasına git
    // - Scroll down
    // - Bilgi modal'ı aç vb.
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      {/* BlurText başlık olarak */}
      <BlurText
        text="INVESTORA"
        className="main-title"
        delay={100}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
      />

      {/* TextType ön planda */}
      <div
        style={{
          marginTop: "0.5rem",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextType
          text={["Yatırım stratejisi, verinin gücüyle yazılır."]}
          typingSpeed={50}
          pauseDuration={2000}
          deletingSpeed={50}
          loop={true}
          forceLoop={false}
          showCursor={false}
          cursorCharacter="|"
          className="main-text-type"
        />
      </div>

      {/* Butonları yan yana ortada */}
      <div
        style={{
          marginTop: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <GetStartedButton onClick={handleGetStarted} />
        <LearnMoreButton onClick={handleLearnMore} />
      </div>
    </div>
  );
};

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
