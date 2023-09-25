import { useState } from "react";

export default function Board() {
  function Square({ value, onSquareClick }) {
    return <button className="square" onClick={onSquareClick}>{value}</button>;
  }

  function Row({ firstIndex, childSquares, handleSquareClick }) {
    return <div className="board-row">
      {childSquares.map((value, sindex) => <Square key={sindex} value={value} onSquareClick={() => handleSquareClick(firstIndex + sindex)} />)}
    </div>;
  }

  function handleClick(i) {
    const nextSquares = squares.slice();
    nextSquares[i] = "X";
    setSquares(nextSquares);
  }

  let squares_per_row = 3;
  let total_squares = 9;
  const [squares, setSquares] = useState(Array(total_squares).fill(null));

  return (
    <div className="board">
      {
        squares.reduce((rows, currentValue) => {
            const arrTemp = rows[rows.length - 1];
            arrTemp.push(currentValue);
            if (arrTemp.length === squares_per_row) rows.push([]);
          
            return rows;
          }, [[]])
          .filter((chunk) => chunk.length) // Clean up last empty array
          .map((row, rindex) => <Row key={rindex} firstIndex={squares_per_row * rindex} childSquares={row} handleSquareClick={handleClick} />)
        }
    </div>
  );
}
