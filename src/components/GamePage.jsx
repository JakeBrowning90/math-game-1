import { useState } from "react";

function GamePage({ navToHome }) {
  const [gameMode, setGameMode] = useState(1);
  const [cap, setCap] = useState(10);
  const [floor, setFloor] = useState(0);
  const [attackPhase, setAttackPhase] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [printedEquation, setPrintedEquation] = useState("");
  const [missingValue, setMissingValue] = useState("");
  const [answer, setAnswer] = useState("");

  const togglePhase = () => {
    setAttackPhase(!attackPhase);
  };

  const getRandomInt = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  };

  const changeMode = (e) => {
    setGameMode(e.target.value);
    console.log("Mode set!");
    console.log(gameMode);
  };

  const generateEquation = () => {
    // Get values
    let values = [];
    if (gameMode == 1 || gameMode == 2) {
      // Get add/sub values
      values = generateAddSub();
      if (gameMode == 1) {
        if (attackPhase == true) {
          // X + Y = (Z)
          setPrintedEquation(`${values[0]} + ${values[1]} = __`);
          setMissingValue(values[2]);
        } else {
          // X + (Y) = Z
          setPrintedEquation(`${values[0]} + __ = ${values[2]}`);
          setMissingValue(values[1]);
        }
      } else if (gameMode == 2) {
        if (attackPhase == true) {
          // Z - X = (Y)
          setPrintedEquation(`${values[2]} - ${values[0]} = __`);
          setMissingValue(values[1]);
        } else {
          // Z - (Y) = X
          setPrintedEquation(`${values[2]} - __ = ${values[0]}`);
          setMissingValue(values[1]);
        }
      }
    } else if (gameMode == 3 || gameMode == 4) {
      // Get mult/div values
      values = generateMultDiv();
      if (gameMode == 3) {
        if (attackPhase == true) {
          // X * Y = (Z)
          setPrintedEquation(`${values[0]} x ${values[1]} = __`);
          setMissingValue(values[2]);
        } else {
          // X * (Y) = Z
          setPrintedEquation(`${values[0]} x __ = ${values[2]}`);
          setMissingValue(values[1]);
        }
      } else if (gameMode == 4) {
        if (attackPhase == true) {
          // Z / X = (Y)
          setPrintedEquation(`${values[2]} % ${values[0]} = __`);
          setMissingValue(values[1]);
        } else {
          // Z * (Y) = X
          setPrintedEquation(`${values[2]} % __ = ${values[0]}`);
          setMissingValue(values[1]);
        }
      }
    }
  };

  const generateAddSub = () => {
    const sum = getRandomInt(floor, cap);
    const addend1 = sum - getRandomInt(floor, sum);
    const addend2 = sum - addend1;
    return [addend1, addend2, sum];
  };

  const generateMultDiv = () => {
    const factor1 = getRandomInt(1, cap);
    const factor2 = getRandomInt(1, cap);
    const product = factor1 * factor2;
    return [factor1, factor2, product];
  };

  const checkAnswer = (e) => {
    e.preventDefault();
    if (answer == missingValue) {
      console.log("Correct!");
      setFeedback("Correct!");
    } else {
      console.log("Miss!");
      setFeedback("Miss!");
    }
    generateEquation();
    setAnswer("");
  };

  return (
    <div>
      <button onClick={navToHome}>Home</button>
      <h1>Game Page</h1>
      <div className="playerSetup">
        <form action="">
          <label htmlFor="">
            Player Name:
            <input type="text" />
          </label>
          <button>Submit</button>
        </form>
        <button onClick={generateEquation}>Generate equation</button>
        <form action="">
          <label htmlFor="">
            {" "}
            Easy
            <input type="radio" />
          </label>
          <label htmlFor="">
            {" "}
            Medium
            <input type="radio" />
          </label>
          <label htmlFor="">
            {" "}
            Hard
            <input type="radio" />
          </label>
          <button>Submit</button>
        </form>

        <form>
          <fieldset>
            <label htmlFor="gameMode1">
              Addition
              <input
                type="radio"
                name="gameMode"
                id="gameMode1"
                value="1"
                checked={gameMode == 1}
                onChange={changeMode}
              />
            </label>
            <label htmlFor="gameMode2">
              Subtraction
              <input
                type="radio"
                name="gameMode"
                id="gameMode2"
                value="2"
                checked={gameMode == 2}
                onChange={changeMode}
              />
            </label>
            <label htmlFor="gameMode3">
              Multiplication
              <input
                type="radio"
                name="gameMode"
                id="gameMode3"
                value="3"
                checked={gameMode == 3}
                onChange={changeMode}
              />
            </label>
            <label htmlFor="gameMode4">
              Division
              <input
                type="radio"
                name="gameMode"
                id="gameMode4"
                value="4"
                checked={gameMode == 4}
                onChange={changeMode}
              />
            </label>
          </fieldset>
        </form>
      </div>

      <button onClick={togglePhase}>
        {attackPhase ? "Switch to defense" : "Switch to attack"}
      </button>

      <div className="equationCard">
        <div>{feedback}</div>
        <div>{printedEquation}</div>
      </div>

      <form onSubmit={checkAnswer}>
        <input
          name="answer"
          type="number"
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(Number(e.target.value))}
        />
        <button>Check</button>
      </form>
    </div>
  );
}

export default GamePage;
