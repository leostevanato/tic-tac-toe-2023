import { createContext, useContext, useState } from "react";

const WinnerContext = createContext(null);

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
      return { "player": squares[a], "result": possibleResults[i] };
    }
  }

  return squares.includes(null) ? null : "draw";
}

function Square({ value, onSquareClick, className }) {
  return <button className={`square ${className}`} onClick={onSquareClick}>{value}</button>;
}

function Row({ firstIndex, childSquares, handleSquareClick }) {
  const winner = useContext(WinnerContext);

  return <div className="board-row">
    {childSquares.map((value, sindex) => {
      const square_index = firstIndex + sindex;
      const winner_class = (winner?.result?.includes(square_index)) ? "winner" : "";

      return <Square key={square_index} value={value} onSquareClick={() => handleSquareClick(square_index)} className={winner_class} />;
    })}
  </div>;
}

function Board({ xIsNext, squares, onPlay }) {
  let squares_per_row = 3;
  let status;
  const winner = useContext(WinnerContext);

  function handleClick(i) {
    if (squares[i] || winner) {
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
    status = (winner === "draw") ? <b>Draw</b> : <>Winner: <b>{winner.player}</b></>;
  } else {
    status = <>Next player: <b>{xIsNext ? "X" : "O"}</b></>;
  }

  return (
    <>
      <div className="status">{status}</div>
      {squares_board}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [historyOrder, setHistoryOrder] = useState("ASC");
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  const winner = calculateWinner(currentSquares);

  function toggleHistoryOrder() {
    setHistoryOrder(current => (current == "ASC") ? "DESC" : "ASC");
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move, histArray) => {
    let move_key = (historyOrder == "DESC") ? (histArray.length - 1) - move : move;
    let description = (move_key > 0) ? 'Go to move #' + move_key : 'Go to game start';
    let col_row = "";

    if (move > 0) {
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] != histArray[move - 1][i]) {
          col_row = ` (${Math.ceil((i + 1) / 3)}, ${i + 1})`;
        }
      }
    }

    return (
      <li key={move_key}>
        {currentMove == move_key ?
          currentMove > 0 ?
            'Move #' + move_key + col_row
            :
            'Game start'
          :
          <button id={move_key} onClick={() => jumpTo(move_key)}>{description + col_row}</button>
        }
      </li>
    );
  });

  return (
    <WinnerContext.Provider value={winner}>
      <div className="game">
        <div className="board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <button className="order" onClick={() => toggleHistoryOrder()}>{historyOrder}</button>
          <ol>{moves}</ol>
        </div>
      </div>
    </WinnerContext.Provider>
  );
}