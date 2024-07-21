import { useState, useEffect } from "react";
import monsters from "./monsterIndex";

function GamePage({ navToHome }) {
  const [gameActive, setGameActive] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [playerHP, setPlayerHP] = useState(0);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [gameMode, setGameMode] = useState("Addition");
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [monster, setMonster] = useState();
  const [monsterHP, setMonsterHP] = useState(0);
  const [turnCounter, setTurnCounter] = useState(1);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [cap, setCap] = useState(10);
  const [floor, setFloor] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [printedEquation, setPrintedEquation] = useState("");
  const [missingValue, setMissingValue] = useState("");
  const [answer, setAnswer] = useState("");

  const toggleGameActive = () => {
    setGameActive((gameActive) => !gameActive);
  };

  const handlePlayerName = (e) => {
    setPlayerName(e.target.value);
  };

  const togglePhase = () => {
    setPlayerTurn((playerTurn) => !playerTurn);
  };

  const startGame = () => {
    toggleGameActive();
    setStartingHP();
    // Get monster from array
    getNextMonster();
    // while (playerHP > 0 && playerLevel < 10) {
    //   // Get monster from array
    //   setMonster(monsters[playerLevel - 1]);
    //   setMonsterHP(monsters[playerLevel - 1].hp);
    //   console.log(monsterHP);

    //   while (monsterHP > 0) {
    //     if (playerHP > 0) {
    //       // Solve 3 problems
    //       runCombatTurn();
    //       // generateEquation();
    //       // Apply damage to monster
    //     } else {
    //       // BREAK - Begin game over
    //     }
    //     if (monsterHP > 0) {
    //       // Solve 3 problems
    //       // Apply damage to player
    //     } else {
    //       // Increase playerLevel
    //       // Increase cap / floor
    //     }
    //   }
    // }
    generateEquation();
  };

  const getNextMonster = () => {
    setMonster(monsters[playerLevel - 1]);
    setMonsterHP(monsters[playerLevel - 1].hp);
  };

  const getRandomInt = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  };

  const changeDifficulty = (e) => {
    setDifficulty(e.target.value);
  };

  const setStartingHP = () => {
    if (difficulty == "Easy") {
      setPlayerHP(15);
    } else if (difficulty == "Medium") {
      setPlayerHP(10);
    } else if (difficulty == "Hard") {
      setPlayerHP(5);
    }
  };

  const changeMode = (e) => {
    setGameMode(e.target.value);
  };

  const generateEquation = (x) => {
    // Get values
    let values = [];
    if (gameMode == "Addition" || gameMode == "Subtraction") {
      // Get add/sub values
      values = generateAddSub();
      if (gameMode == "Addition") {
        if (playerTurn) {
          // X + Y = (Z)
          setPrintedEquation(`${values[0]} + ${values[1]} = __`);
          setMissingValue(values[2]);
          console.log("Player's turn");
        } else {
          // X + (Y) = Z
          setPrintedEquation(`${values[0]} + __ = ${values[2]}`);
          setMissingValue(values[1]);
          console.log("Monster's turn");
        }
      } else if (gameMode == "Subtraction") {
        if (playerTurn) {
          // Z - X = (Y)
          setPrintedEquation(`${values[2]} - ${values[0]} = __`);
          setMissingValue(values[1]);
        } else {
          // Z - (Y) = X
          setPrintedEquation(`${values[2]} - __ = ${values[0]}`);
          setMissingValue(values[1]);
        }
      }
    } else if (gameMode == "Multiplication" || gameMode == "Division") {
      // Get mult/div values
      values = generateMultDiv();
      if (gameMode == "Multiplication") {
        if (playerTurn == true) {
          // X * Y = (Z)
          setPrintedEquation(`${values[0]} x ${values[1]} = __`);
          setMissingValue(values[2]);
        } else {
          // X * (Y) = Z
          setPrintedEquation(`${values[0]} x __ = ${values[2]}`);
          setMissingValue(values[1]);
        }
      } else if (gameMode == "Division") {
        if (playerTurn == true) {
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
      setFeedback("Correct!");
      // TODO - Add to damage counter
      setRightAnswers((rightAnswers) => rightAnswers + 1);
      setCurrentStreak((currentStreak) => currentStreak + 1);
      if (currentStreak >= bestStreak) {
        setBestStreak((bestStreak) => bestStreak + 1);
      }
    } else {
      setFeedback("Miss!");
      setCurrentStreak((currentStreak) => currentStreak - currentStreak);
    }
    setAnswer("");
    setTurnCounter((turnCounter) => turnCounter + 1);
  };

  useEffect(() => {
    if (turnCounter > 3) {
      if (playerTurn) {
        // Apply damage to monster
        if (rightAnswers == 3) {
          setMonsterHP((monsterHP) => monsterHP - (rightAnswers + playerLevel));
        } else {
          setMonsterHP((monsterHP) => monsterHP - rightAnswers);
        }
      } else {
        // Apply damage to player or heal 1 for perfect defense
        if (rightAnswers == 3) {
          setPlayerHP((playerHP) => playerHP + 1);
        } else {
          setPlayerHP((playerHP) => playerHP - (3 - rightAnswers));
        }
      }
      // TODO - Check if player or monster is < 1 HP
      togglePhase();
      setTurnCounter(1);
      setRightAnswers(0)
      generateEquation();
    } else {
      generateEquation();
    }
  }, [turnCounter]);

  return (
    <div>
      <button onClick={navToHome}>Home</button>
      <h1>Game Page</h1>
      <div className="playerSetup">
        <form action="">
          <label htmlFor="playerName">
            Player Name:
            <input
              type="text"
              name="playerName"
              id="playerName"
              minLength="1"
              maxLength="10"
              value={playerName}
              onChange={handlePlayerName}
            />
          </label>
        </form>

        <form action="">
          <label htmlFor="easy">
            Easy
            <input
              type="radio"
              name="difficulty"
              id="easy"
              value="Easy"
              checked={difficulty == "Easy"}
              onChange={changeDifficulty}
            />
          </label>
          <label htmlFor="medium">
            Medium
            <input
              type="radio"
              name="difficulty"
              id="medium"
              value="Medium"
              checked={difficulty == "Medium"}
              onChange={changeDifficulty}
            />
          </label>
          <label htmlFor="hard">
            Hard
            <input
              type="radio"
              name="difficulty"
              id="hard"
              value="Hard"
              checked={difficulty == "Hard"}
              onChange={changeDifficulty}
            />
          </label>
        </form>

        <form>
          <fieldset>
            <label htmlFor="gameMode1">
              Addition
              <input
                type="radio"
                name="gameMode"
                id="gameMode1"
                value="Addition"
                checked={gameMode == "Addition"}
                onChange={changeMode}
              />
            </label>
            <label htmlFor="gameMode2">
              Subtraction
              <input
                type="radio"
                name="gameMode"
                id="gameMode2"
                value="Subtraction"
                checked={gameMode == "Subtraction"}
                onChange={changeMode}
              />
            </label>
            <label htmlFor="gameMode3">
              Multiplication
              <input
                type="radio"
                name="gameMode"
                id="gameMode3"
                value="Multiplication"
                checked={gameMode == "Multiplication"}
                onChange={changeMode}
              />
            </label>
            <label htmlFor="gameMode4">
              Division
              <input
                type="radio"
                name="gameMode"
                id="gameMode4"
                value="Division"
                checked={gameMode == "Division"}
                onChange={changeMode}
              />
            </label>
          </fieldset>
        </form>
        <button onClick={startGame}>Start Game (Generate equation)</button>
      </div>

      <button onClick={togglePhase}>
        {playerTurn ? "Switch to defense" : "Switch to attack"}
      </button>
      {gameActive && (
        <div>
          <div className="gameInfoCard">
            <div>Name: {playerName}</div>
            <div>Level: {playerLevel}</div>
            <div>Player HP: {playerHP}</div>
            <div>Difficulty: {difficulty}</div>
            <div>Problem type: {gameMode}</div>
            <div>Cap: {cap}</div>
            <div>Current Streak: {currentStreak}</div>
            <div>Best Streak: {bestStreak}</div>
            <div>Turn Counter: {turnCounter}</div>
          </div>
          {monster && (
            <div className="enemyInfoCard">
              <div>Enemy type: {monster.name} </div>
              <div>Enemy HP: {monsterHP}</div>
            </div>
          )}
          {playerTurn ? <div>Player's turn</div> : <div>Monster's turn</div>}
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
      )}
    </div>
  );
}

export default GamePage;
