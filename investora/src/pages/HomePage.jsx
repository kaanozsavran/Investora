import BlurText from "../components/BlurText";
import TextType from "../components/TextType";
import GetStartedButton from "../components/GetStartedButton";
import LearnMoreButton from "../components/LearnMoreButton";
import "../css/BlurText.css";
import "../css/TextType.css";

import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  const handleGetStarted = () => {
    navigate("/stocks");
  };

  const handleLearnMore = () => {
    navigate("/about");
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
      <BlurText
        text="INVESTORA"
        className="main-title"
        delay={100}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
      />

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

export default HomePage;
