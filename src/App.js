import { useState } from "react";

export default function Board() {
  let squares_per_row = 3;
  let total_squares = 9;
  let status;
  
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(total_squares).fill(null));

  const winner = calculateWinner(squares);

  function Square({ value, onSquareClick }) {
    return <button className="square" onClick={onSquareClick}>{value}</button>;
  }

  function Row({ firstIndex, childSquares, handleSquareClick }) {
    return <div className="board-row">
      {childSquares.map((value, sindex) => <Square key={sindex} value={value} onSquareClick={() => handleSquareClick(firstIndex + sindex)} />)}
    </div>;
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    nextSquares[i] = (xIsNext)? "X" : "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

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

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="board">
      <div className="status">{status}</div>
      {
        squares.reduce((rows, currentValue) => {
            const arrTemp = rows[rows.length - 1];
            arrTemp.push(currentValue);

            if (arrTemp.length === squares_per_row) {
              rows.push([]);
            }
            
            return rows;
          }, [[]])
          .filter((chunk) => chunk.length) // Clean up last empty array
          .map((row, rindex) => <Row key={rindex} firstIndex={squares_per_row * rindex} childSquares={row} handleSquareClick={handleClick} />)
        }
    </div>
  );
}
