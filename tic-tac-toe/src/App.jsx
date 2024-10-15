import { useState } from "react";

function Title() {
  return (
    <header>
      <h1>Tic-Tac-Toe</h1>
    </header>
  );
}
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ isXNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calcWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();

    if (isXNext) {
      newSquares[i] = "X";
    } else {
      newSquares[i] = "O";
    }

    onPlay(newSquares);
  }

  const winner = calcWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${isXNext ? "X" : "O"}`;
  }

  return (
    <>
      <div className="board">
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isXNext, setXNext] = useState(true);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXNext(!isXNext);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setXNext(move % 2 === 0);
  }

  return (
    <>
      <div>
        <Title />
      </div>
      <div className="game-board">
        <div>
          <Board
            isXNext={isXNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="restart">
          <button className="restart-button" onClick={() => jumpTo(0)}>
            Restart
          </button>
        </div>
      </div>
    </>
  );
}

function calcWinner(squares) {
  const winnerLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winnerLines.length; i++) {
    const [a, b, c] = winnerLines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
