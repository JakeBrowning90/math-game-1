import { useState } from "react";

function GamePage({ navToHome }) {
  const [gameMode, setGameMode] = useState(4);
  const [attackPhase, setAttackPhase] = useState(true);
  const [sum, setSum] = useState(0);
  const [addend1, setAddend1] = useState("");
  const [addend2, setAddend2] = useState("");
  const [product, setProduct] = useState("");
  const [factor1, setFactor1] = useState("");
  const [factor2, setFactor2] = useState("");
  const [feedback, setFeedback] = useState("");
  const [printedEquation, setPrintedEquation] = useState("");
  const [missingValue, setMissingValue] = useState("");
  const [answer, setAnswer] = useState("");

  const getRandomInt = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
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
    const sum = getRandomInt(1, 20)
    const addend1 = sum - getRandomInt(1, sum)
    const addend2 = sum - addend1;
    return [addend1, addend2, sum];
  };

  const generateMultDiv = () => {
    const factor1 = getRandomInt(1, 10)
    const factor2 = getRandomInt(1, 10)
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

        <form action="">
          <label htmlFor="">
            {" "}
            Addition
            <input type="radio" />
          </label>
          <label htmlFor="">
            {" "}
            Subtraction
            <input type="radio" />
          </label>
          <label htmlFor="">
            {" "}
            Multiplication
            <input type="radio" />
          </label>
          <label htmlFor="">
            {" "}
            Division
            <input type="radio" />
          </label>
          <button>Submit</button>
        </form>
      </div>

      <div className="equationsDiv">
        <h1>
          {" "}
          Addition attack: {addend1} + {addend2} = __
        </h1>
        <h1>
          {" "}
          Subtraction attack: {sum} - {addend1} = __
        </h1>
        <h1>
          {" "}
          Addition defend: {addend1} + __ = {sum}
        </h1>
        <h1>
          {" "}
          Subtraction defend: {sum} - __ = {addend1}
        </h1>

        <button onClick={generateAddSub}>Generate +/-</button>
      </div>

      <div className="equationsDiv">
        <h1>
          {" "}
          Multiplication attack: {factor1} x {factor2} = __
        </h1>
        <h1>
          {" "}
          Division attack: {product} % {factor1} = __
        </h1>
        <h1>
          {" "}
          Multiplication defend: {factor1} x __ = {product}
        </h1>
        <h1>
          {" "}
          Division defend: {product} % __ = {factor1}
        </h1>

        <button onClick={generateMultDiv}>Generate x/%</button>
      </div>

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
