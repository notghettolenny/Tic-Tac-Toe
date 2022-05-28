import logo from "../assets/logo.svg";
import iconRestart from "../assets/icon-restart.svg";
import "./Gameboard.css";

const Gameboard = ({
  currentTurn,
  xScore,
  oScore,
  tiesScore,
  playRound,
  boardSpaces,
  setShowRestartModal,
  playAgainstCPU,
  playersInfo,
  gameInProgress,
}) => {
  return (
    <section className="gameboard container">
      <div className="header">
        <img src={logo} alt="Tic-tac-toe XO logo" className="logo" />
        <h2 className="turn-indicator">
          {currentTurn % 2 === 1 ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="turn-icon"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.7785 2.64487L13.3551 0.22153C13.0598 -0.0738435 12.5809 -0.0738435 12.2855 0.22153L8 4.50702L3.71451 0.22153C3.41914 -0.0738435 2.94024 -0.0738435 2.64487 0.22153L0.22153 2.64487C-0.0738435 2.94024 -0.0738435 3.41914 0.22153 3.71451L4.50702 8L0.22153 12.2855C-0.0738435 12.5809 -0.0738435 13.0598 0.22153 13.3551L2.64487 15.7785C2.94024 16.0738 3.41914 16.0738 3.71451 15.7785L8 11.493L12.2855 15.7785C12.5809 16.0738 13.0598 16.0738 13.3551 15.7785L15.7785 13.3551C16.0738 13.0598 16.0738 12.5809 15.7785 12.2855L11.493 8L15.7785 3.71451C16.0738 3.41914 16.0738 2.94024 15.7785 2.64487Z"
                fill="#A8BFC9"
              />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="turn-icon"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8ZM4.74074 8C4.74074 6.19996 6.19996 4.74074 8 4.74074C9.80004 4.74074 11.2593 6.19996 11.2593 8C11.2593 9.80004 9.80004 11.2593 8 11.2593C6.19996 11.2593 4.74074 9.80004 4.74074 8Z"
                fill="#A8BFC9"
              />
            </svg>
          )}
          <span className="visually-hidden">
            {currentTurn % 2 === 1 ? "X's" : "O's"}
          </span>
          turn
        </h2>
        <button
          className="restart-btn"
          onClick={() => setShowRestartModal(true)}
        >
          <span className="visually-hidden">Restart Game</span>
          <img src={iconRestart} alt="" className="restart-icon" />
        </button>
      </div>
      <div className={`game-grid ${currentTurn % 2 ? "x-turn" : "o-turn"}`}>
        {boardSpaces.map((space, idx) => {
          return (
            <button
              key={idx}
              type="button"
              className={`board-space ${
                space.spaceClass ? space.spaceClass : ""
              }`}
              value={idx}
              onClick={playRound}
              disabled={space.spaceDisabled || !gameInProgress}
            >
              <span className="visually-hidden">
                Tic Tac Toe <span className="move">blank</span> spaece
              </span>
            </button>
          );
        })}
      </div>
      <div className="score-wrapper">
        <div className="score player-x">
          <h3 className="score-heading">
            X (
            {playAgainstCPU && playersInfo[0].playerOne === "x"
              ? "You"
              : !playAgainstCPU && playersInfo[0].playerOne === "x"
              ? "P1"
              : !playAgainstCPU && playersInfo[1].playerTwo === "x"
              ? "P2"
              : "CPU"}
            )
          </h3>
          <span className="score-value">{xScore}</span>
        </div>
        <div className="score ties">
          <h3 className="score-heading">Ties</h3>
          <span className="score-value">{tiesScore}</span>
        </div>
        <div className="score player-o">
          <h3 className="score-heading">
            O (
            {playAgainstCPU && playersInfo[0].playerOne === "o"
              ? "You"
              : !playAgainstCPU && playersInfo[0].playerOne === "o"
              ? "P1"
              : !playAgainstCPU && playersInfo[1].playerTwo === "o"
              ? "P2"
              : "CPU"}
            )
          </h3>
          <span className="score-value">{oScore}</span>
        </div>
      </div>
    </section>
  );
};

export default Gameboard;
