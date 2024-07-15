import { useState } from "react";

function GamePage({ navToHome }) {
  const [sum, setSum] = useState(0);
  const [addend1, setAddend1] = useState('');
  const [addend2, setAddend2] = useState('');
  const [product, setProduct] = useState('');
  const [factor1, setFactor1] = useState('');
  const [factor2, setFactor2] = useState('');
  const [answer, setAnswer] = useState('');

  const generateAddSub = () => {
    const sum = Math.floor(Math.random() * 100);
    const addend1 = sum - Math.floor(Math.random() * sum);
    const addend2 = sum - addend1;
    setSum(sum);
    setAddend1(addend1);
    setAddend2(addend2);
  };

  const generateMultDiv = () => {
    const factor1 = Math.floor(Math.random() * 10);
    const factor2 = Math.floor(Math.random() * 10);
    const product = factor1 * factor2;
    setProduct(product);
    setFactor1(factor1);
    setFactor2(factor2);
  };

  const checkAnswer = (e) => {
    e.preventDefault();
    if (answer == sum) {
      console.log("Correct!")
    } else {
      console.log("Try again!")
    }
    generateAddSub();
    setAnswer('')
  };

  return (
    <div>
      <button onClick={navToHome}>Home</button>
      <h1>Game Page</h1>
      <form action="">
        <label htmlFor="">
          Player Name:
          <input type="text" />
        </label>
        <button>Submit</button>
      </form>

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

      <div>
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

        <button onClick={generateAddSub}>Generate number</button>
      </div>

      <div>
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

        <button onClick={generateMultDiv}>Generate number</button>

        <form onSubmit={checkAnswer}>
          <input
            name="answer"
            type="number"
            id="answer"
            value={answer}
            onChange={e => setAnswer(Number(e.target.value))}
          />
          <button>Check</button>
        </form>
      </div>
    </div>
  );
}

export default GamePage;
