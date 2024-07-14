import { useState } from "react";

function GamePage({ navToHome }) {
  const [number, setNumber] = useState(0);
  const [addend1, setAddend1] = useState(0);
  const [addend2, setAddend2] = useState(0);

  const generateNumber = () => {
    const number = Math.floor(Math.random() * 100);
    const addend1 = number - Math.floor(Math.random() * number);
    const addend2 = number - addend1;
    setNumber(number);
    setAddend1(addend1);
    setAddend2(addend2);
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
      <h1>{number}</h1>
      <h1>
        {addend1} + {addend2}
      </h1>
      <button onClick={generateNumber}>Generate number</button>
    </div>
  );
}

export default GamePage;
