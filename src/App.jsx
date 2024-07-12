import { useState } from "react";
import "./Reset.css";
import "./App.css";
import GamePage from "./components/GamePage";
import ScorePage from "./components/ScorePage";
import AboutPage from "./components/AboutPage";
import CreditBar from "./components/CreditBar";

function App() {
  const [homePageActive, setHomePageActive] = useState(true);
  const [gamePageActive, setGamePageActive] = useState(false);
  const [scorePageActive, setScorePageActive] = useState(false);
  const [aboutPageActive, setAboutPageActive] = useState(false);

  const navToHome = () => {
    setHomePageActive(true);
    setGamePageActive(false);
    setScorePageActive(false);
    setAboutPageActive(false);
  };

  const navToGame = () => {
    setHomePageActive(false);
    setGamePageActive(true);
    setScorePageActive(false);
    setAboutPageActive(false);
  };

  const navToScore = () => {
    setHomePageActive(false);
    setGamePageActive(false);
    setScorePageActive(true);
    setAboutPageActive(false);
  };

  const navToAbout = () => {
    setHomePageActive(false);
    setGamePageActive(false);
    setScorePageActive(false);
    setAboutPageActive(true);
  };

  return (
    <>
      {homePageActive && (
        <div>
          <h1>Math Game</h1>
          <button onClick={navToGame}>Start Game</button>
          <button onClick={navToScore}>Scoreboard</button>
          <button onClick={navToAbout}>About</button>
        </div>
      )}

      {gamePageActive && <GamePage navToHome={navToHome} />}
      {scorePageActive && <ScorePage navToHome={navToHome} />}
      {aboutPageActive && <AboutPage navToHome={navToHome} />}
      <CreditBar />
    </>
  );
}

export default App;
