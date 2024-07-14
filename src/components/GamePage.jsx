function GamePage({ navToHome }) {
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
    </div>
  );
}

export default GamePage;
