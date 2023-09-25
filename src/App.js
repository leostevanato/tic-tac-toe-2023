import { useState } from "react";

export default function Board() {
  let squares_per_row = 3;
  let total_squares = 9;
  let status;
  
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(total_squares).fill(null));

  function Square({ value, onSquareClick }) {
    return <button className="square" onClick={onSquareClick}>{value}</button>;
  }

  function Row({ firstIndex, childSquares, handleSquareClick }) {
    return <div className="board-row">
      {childSquares.map((value, sindex) => <Square key={sindex} value={value} onSquareClick={() => handleSquareClick(firstIndex + sindex)} />)}
    </div>;
  }

  function handleClick(i) {
    if (squares[i]) {
      return;
    }

    const nextSquares = squares.slice();

    nextSquares[i] = (xIsNext)? "X" : "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }


  return (
    <div className="board">
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
