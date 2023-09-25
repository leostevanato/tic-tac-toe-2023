import { useState } from "react";

function calculateWinner(squares) {
  const possibleResults = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < possibleResults.length; i++) {
    const [a, b, c] = possibleResults[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function Row({ firstIndex, childSquares, handleSquareClick }) {
  return <div className="board-row">
    {childSquares.map((value, sindex) => <Square key={sindex} value={value} onSquareClick={() => handleSquareClick(firstIndex + sindex)} />)}
  </div>;
}

function Board({ xIsNext, squares, onPlay }) {
  let squares_per_row = 3;
  let status;

  const winner = calculateWinner(squares);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    nextSquares[i] = (xIsNext) ? "X" : "O";

    onPlay(nextSquares);
  }

  const squares_board = squares
    .reduce((rows, currentValue) => {
      const arrTemp = rows[rows.length - 1];
      arrTemp.push(currentValue);

      if (arrTemp.length === squares_per_row) {
        rows.push([]);
      }

      return rows;
    }, [[]])
    .filter((chunk) => chunk.length)
    .map((row, rindex) => <Row key={rindex} firstIndex={squares_per_row * rindex} childSquares={row} handleSquareClick={handleClick} />);

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      {squares_board}
    </>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description = (move > 0) ? 'Go to move #' + move : 'Go to game start';

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}