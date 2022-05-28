import { useState, useEffect, useCallback } from "react";
import Modal from "./components/Modal";
import Gameboard from "./components/Gameboard";
import logo from "./assets/logo.svg";
import xIcon from "./assets/icon-x.svg";
import oIcon from "./assets/icon-o.svg";
import "./App.css";

// TODO: Prevent turn from updating if gameover until after game restarts

const App = () => {
  const [showNewGameModal, setShowNewGameModal] = useState(true);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [playAgainstCPU, setPlayAgainstCPU] = useState(null);
  const [playersInfo, setPlayersInfo] = useState([
    { playerOne: "x", playerType: "human" },
    { playerTwo: "o" },
  ]);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [winner, setWinner] = useState(null);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [tiesScore, setTiesScore] = useState(0);
  const [boardSpaces, setBoardSpaces] = useState([
    { id: 1, spaceDisabled: false },
    { id: 2, spaceDisabled: false },
    { id: 3, spaceDisabled: false },
    { id: 4, spaceDisabled: false },
    { id: 5, spaceDisabled: false },
    { id: 6, spaceDisabled: false },
    { id: 7, spaceDisabled: false },
    { id: 8, spaceDisabled: false },
    { id: 9, spaceDisabled: false },
  ]);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [xStarts, setXStarts] = useState(true);

  const startGame = (e) => {
    const updatePlayersInfo = [...playersInfo];
    if (e.target.value === "cpu") {
      setPlayAgainstCPU(true);
      updatePlayersInfo[1].playerType = "cpu";
    } else if (e.target.value === "human") {
      setPlayAgainstCPU(false);
      updatePlayersInfo[1].playerType = "human";
    }
    setShowNewGameModal(false);
    setPlayersInfo(updatePlayersInfo);
    setGameInProgress(true);
    resetBoard();
    setCurrentTurn(1);
  };

  const colorWinningTiles = useCallback(
    (mark) => {
      const indexes = [];
      if (
        boardSpaces[0].playerMark === mark &&
        boardSpaces[1].playerMark === mark &&
        boardSpaces[2].playerMark === mark
      ) {
        indexes.push(0);
        indexes.push(1);
        indexes.push(2);
      } else if (
        boardSpaces[3].playerMark === mark &&
        boardSpaces[4].playerMark === mark &&
        boardSpaces[5].playerMark === mark
      ) {
        indexes.push(3);
        indexes.push(4);
        indexes.push(5);
      } else if (
        boardSpaces[6].playerMark === mark &&
        boardSpaces[7].playerMark === mark &&
        boardSpaces[8].playerMark === mark
      ) {
        indexes.push(6);
        indexes.push(7);
        indexes.push(8);
      } else if (
        boardSpaces[0].playerMark === mark &&
        boardSpaces[4].playerMark === mark &&
        boardSpaces[8].playerMark === mark
      ) {
        indexes.push(0);
        indexes.push(4);
        indexes.push(8);
      } else if (
        boardSpaces[2].playerMark === mark &&
        boardSpaces[4].playerMark === mark &&
        boardSpaces[6].playerMark === mark
      ) {
        indexes.push(2);
        indexes.push(4);
        indexes.push(6);
      } else if (
        boardSpaces[0].playerMark === mark &&
        boardSpaces[3].playerMark === mark &&
        boardSpaces[6].playerMark === mark
      ) {
        indexes.push(0);
        indexes.push(3);
        indexes.push(6);
      } else if (
        boardSpaces[1].playerMark === mark &&
        boardSpaces[4].playerMark === mark &&
        boardSpaces[7].playerMark === mark
      ) {
        indexes.push(1);
        indexes.push(4);
        indexes.push(7);
      } else if (
        boardSpaces[2].playerMark === mark &&
        boardSpaces[5].playerMark === mark &&
        boardSpaces[8].playerMark === mark
      ) {
        indexes.push(2);
        indexes.push(5);
        indexes.push(8);
      }
      const spaces = [...boardSpaces];
      spaces.forEach((space, idx) => {
        if (indexes.includes(idx)) {
          space.spaceClass = `${mark}-space winning-play`;
        }
      });
      setBoardSpaces(spaces);
    },
    [boardSpaces]
  );

  const determineWinner = useCallback(() => {
    if (
      (boardSpaces[0].playerMark === "x" &&
        boardSpaces[1].playerMark === "x" &&
        boardSpaces[2].playerMark === "x") ||
      (boardSpaces[3].playerMark === "x" &&
        boardSpaces[4].playerMark === "x" &&
        boardSpaces[5].playerMark === "x") ||
      (boardSpaces[6].playerMark === "x" &&
        boardSpaces[7].playerMark === "x" &&
        boardSpaces[8].playerMark === "x") ||
      (boardSpaces[0].playerMark === "x" &&
        boardSpaces[4].playerMark === "x" &&
        boardSpaces[8].playerMark === "x") ||
      (boardSpaces[2].playerMark === "x" &&
        boardSpaces[4].playerMark === "x" &&
        boardSpaces[6].playerMark === "x") ||
      (boardSpaces[0].playerMark === "x" &&
        boardSpaces[3].playerMark === "x" &&
        boardSpaces[6].playerMark === "x") ||
      (boardSpaces[1].playerMark === "x" &&
        boardSpaces[4].playerMark === "x" &&
        boardSpaces[7].playerMark === "x") ||
      (boardSpaces[2].playerMark === "x" &&
        boardSpaces[5].playerMark === "x" &&
        boardSpaces[8].playerMark === "x")
    ) {
      setXScore((prevXScore) => prevXScore + 1);
      setWinner("x");
      setGameInProgress(false);
      colorWinningTiles("x");
      setTimeout(() => setShowResultsModal(true), 1000);
    } else if (
      (boardSpaces[0].playerMark === "o" &&
        boardSpaces[1].playerMark === "o" &&
        boardSpaces[2].playerMark === "o") ||
      (boardSpaces[3].playerMark === "o" &&
        boardSpaces[4].playerMark === "o" &&
        boardSpaces[5].playerMark === "o") ||
      (boardSpaces[6].playerMark === "o" &&
        boardSpaces[7].playerMark === "o" &&
        boardSpaces[8].playerMark === "o") ||
      (boardSpaces[0].playerMark === "o" &&
        boardSpaces[4].playerMark === "o" &&
        boardSpaces[8].playerMark === "o") ||
      (boardSpaces[2].playerMark === "o" &&
        boardSpaces[4].playerMark === "o" &&
        boardSpaces[6].playerMark === "o") ||
      (boardSpaces[0].playerMark === "o" &&
        boardSpaces[3].playerMark === "o" &&
        boardSpaces[6].playerMark === "o") ||
      (boardSpaces[1].playerMark === "o" &&
        boardSpaces[4].playerMark === "o" &&
        boardSpaces[7].playerMark === "o") ||
      (boardSpaces[2].playerMark === "o" &&
        boardSpaces[5].playerMark === "o" &&
        boardSpaces[8].playerMark === "o")
    ) {
      setOScore((prevOScore) => prevOScore + 1);
      setWinner("o");
      setGameInProgress(false);
      colorWinningTiles("o");
      setTimeout(() => setShowResultsModal(true), 1000);
    } else if (
      boardSpaces[0].playerMark &&
      boardSpaces[1].playerMark &&
      boardSpaces[2].playerMark &&
      boardSpaces[3].playerMark &&
      boardSpaces[4].playerMark &&
      boardSpaces[5].playerMark &&
      boardSpaces[6].playerMark &&
      boardSpaces[7].playerMark &&
      boardSpaces[8].playerMark
    ) {
      setTiesScore((prevTiesScore) => prevTiesScore + 1);
      setWinner("tied");
      setGameInProgress(false);
      setTimeout(() => setShowResultsModal(true), 1000);
    }
  }, [boardSpaces, colorWinningTiles]);

  const playRound = (e) => {
    const spaceIndex = e.target.value;
    const spaces = [...boardSpaces];
    if (currentTurn % 2 === 1) {
      spaces[spaceIndex].playerMark = "x";
      spaces[spaceIndex].spaceClass = "x-space";
      spaces[spaceIndex].spaceDisabled = true;
    } else {
      spaces[spaceIndex].playerMark = "o";
      spaces[spaceIndex].spaceClass = "o-space";
      spaces[spaceIndex].spaceDisabled = true;
    }
    if (gameInProgress) {
      setCurrentTurn((prevCurrentTurn) => prevCurrentTurn + 1);
    }
    setBoardSpaces(spaces);
    determineWinner();
  };

  const handleMarkChange = (e) => {
    const updatePlayersInfo = [...playersInfo];
    if (e.target.value === "x") {
      updatePlayersInfo[0].playerOne = "x";
      updatePlayersInfo[1].playerTwo = "o";
    } else {
      updatePlayersInfo[0].playerOne = "o";
      updatePlayersInfo[1].playerTwo = "x";
    }
    setPlayersInfo(updatePlayersInfo);
  };

  const resetBoard = () => {
    setBoardSpaces([
      { id: 1, spaceDisabled: false },
      { id: 2, spaceDisabled: false },
      { id: 3, spaceDisabled: false },
      { id: 4, spaceDisabled: false },
      { id: 5, spaceDisabled: false },
      { id: 6, spaceDisabled: false },
      { id: 7, spaceDisabled: false },
      { id: 8, spaceDisabled: false },
      { id: 9, spaceDisabled: false },
    ]);
    setWinner(null);
    setGameInProgress(true);
  };

  const disableBoard = () => {
    setGameInProgress(false);
  };

  useEffect(() => {
    const cpuMarker = playersInfo[1].playerTwo;
    if (
      playAgainstCPU &&
      gameInProgress &&
      !winner &&
      ((cpuMarker === "x" && currentTurn % 2 === 1) ||
        (cpuMarker === "o" && currentTurn % 2 === 0))
    ) {
      setGameInProgress(false);
      const availableSpaces = boardSpaces.filter((space) => !space.playerMark);
      const cpuPlay = Math.floor(Math.random() * availableSpaces.length);
      const playIndex = boardSpaces.findIndex(
        (space) => space.id === availableSpaces[cpuPlay].id
      );
      const spaces = [...boardSpaces];
      setTimeout(() => {
        spaces[playIndex].playerMark = cpuMarker;
        spaces[playIndex].spaceClass = `${cpuMarker}-space`;
        spaces[playIndex].spaceDisabled = true;
        setBoardSpaces(spaces);
        setGameInProgress(true);
        setCurrentTurn((prevCurrentTurn) => prevCurrentTurn + 1);
        determineWinner();
      }, 1000);
    }
  }, [
    boardSpaces,
    playAgainstCPU,
    playersInfo,
    currentTurn,
    gameInProgress,
    winner,
    determineWinner,
  ]);

  return (
    <>
      <h1 className="visually-hidden">Tic Tac Toe</h1>
      {showNewGameModal && (
        <Modal modalClasses="modal start-modal">
          <div className="new-game container">
            <img src={logo} alt="Tic-tac-toe XO logo" className="logo" />
            <form className="icon-settings">
              <h2 className="heading">Pick player 1&rsquo;s mark</h2>
              <div className="icons-wrapper">
                <input
                  type="radio"
                  name="playerIcon"
                  id="iconX"
                  className="visually-hidden icon-option"
                  value="x"
                  defaultChecked
                  onChange={handleMarkChange}
                />
                <label htmlFor="iconX" className="icon-label">
                  <span className="visually-hidden">X icon</span>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M31.5569 5.28973L26.7103 0.443061C26.1195 -0.147687 25.1617 -0.147687 24.571 0.443061L16 9.01404L7.42902 0.443061C6.83827 -0.147687 5.88048 -0.147687 5.28973 0.443061L0.443061 5.28973C-0.147687 5.88048 -0.147687 6.83827 0.443061 7.42902L9.01404 16L0.443061 24.571C-0.147687 25.1617 -0.147687 26.1195 0.443061 26.7103L5.28973 31.5569C5.88048 32.1477 6.83827 32.1477 7.42902 31.5569L16 22.986L24.571 31.5569C25.1617 32.1477 26.1195 32.1477 26.7103 31.5569L31.5569 26.7103C32.1477 26.1195 32.1477 25.1617 31.5569 24.571L22.986 16L31.5569 7.42902C32.1477 6.83827 32.1477 5.88048 31.5569 5.28973Z"
                      className="icon"
                    />
                  </svg>
                </label>
                <input
                  type="radio"
                  name="playerIcon"
                  id="iconO"
                  className="visually-hidden icon-option"
                  value="o"
                  onChange={handleMarkChange}
                />
                <label htmlFor="iconO" className="icon-label">
                  <span className="visually-hidden">O icon</span>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M31.7412 15.8706C31.7412 7.10551 24.6357 0 15.8706 0C7.10551 0 0 7.10551 0 15.8706C0 24.6357 7.10551 31.7412 15.8706 31.7412C24.6357 31.7412 31.7412 24.6357 31.7412 15.8706ZM9.4048 15.8706C9.4048 12.2996 12.2996 9.4048 15.8706 9.4048C19.4416 9.4048 22.3364 12.2996 22.3364 15.8706C22.3364 19.4416 19.4416 22.3364 15.8706 22.3364C12.2996 22.3364 9.4048 19.4416 9.4048 15.8706Z"
                      className="icon"
                    />
                  </svg>
                </label>
              </div>
              <p className="paragraph">Remember: X goes first</p>
            </form>
            <button
              className="new-game-btn new-game-cpu"
              type="button"
              value="cpu"
              onClick={startGame}
            >
              New Game (vs CPU)
            </button>
            <button
              className="new-game-btn new-game-human"
              type="button"
              value="human"
              onClick={startGame}
            >
              New Game (vs player)
            </button>
          </div>
        </Modal>
      )}
      <Gameboard
        currentTurn={currentTurn}
        xScore={xScore}
        oScore={oScore}
        tiesScore={tiesScore}
        playRound={playRound}
        boardSpaces={boardSpaces}
        setShowRestartModal={setShowRestartModal}
        playAgainstCPU={playAgainstCPU}
        playersInfo={playersInfo}
        gameInProgress={gameInProgress}
      />
      {showRestartModal && (
        <Modal modalClasses="modal restart-modal">
          <div className="content-wrapper">
            <h2 className="restart-heading">Restart game?</h2>
            <button
              className="modal-btn cancel-btn"
              onClick={() => setShowRestartModal(false)}
            >
              No, cancel
            </button>
            <button
              className="modal-btn btn-restart"
              onClick={() => {
                resetBoard();
                setShowRestartModal(false);
                setCurrentTurn(() => {
                  if (xStarts) {
                    return 1;
                  } else {
                    return 0;
                  }
                });
              }}
            >
              Yes, restart
            </button>
          </div>
        </Modal>
      )}
      {showResultsModal && (
        <Modal modalClasses="modal results-modal">
          <div className="content-wrapper">
            {playAgainstCPU && winner !== "tied" && (
              <h2 className="results-heading">
                {(winner === playersInfo[0].playerOne &&
                  playersInfo[0].playerType === "human") ||
                (winner === playersInfo[1].playerTwo &&
                  playersInfo[1].playerType === "human")
                  ? "You won!"
                  : "Oh no, you lost"}
              </h2>
            )}
            {!playAgainstCPU && winner !== "tied" && (
              <h2 className="results-heading">
                Player {winner === playersInfo[0].playerOne ? "1" : "2"} wins!
              </h2>
            )}
            {winner !== "tied" && (
              <p className={`results-paragraph ${winner}-paragraph`}>
                <img
                  src={winner === "x" ? xIcon : oIcon}
                  alt=""
                  className="winner-marker"
                />
                <span>takes the round</span>
              </p>
            )}
            {winner === "tied" && (
              <h2 className="tied-results-heading">Round tied</h2>
            )}
            <button
              className="modal-btn quit-btn"
              onClick={() => {
                disableBoard();
                setShowResultsModal(false);
                setShowNewGameModal(true);
              }}
            >
              Quit
            </button>
            <button
              className="modal-btn next-btn"
              onClick={() => {
                resetBoard();
                setShowResultsModal(false);
                setCurrentTurn(() => {
                  if (xStarts) {
                    return 0;
                  } else {
                    return 1;
                  }
                });
                setXStarts(() => !xStarts);
              }}
            >
              Next round
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default App;
