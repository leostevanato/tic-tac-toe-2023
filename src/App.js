export default function Board() {
  function Square({ value }) {
    return <button className="square">{value}</button>;
  }

  function Row({ squares }) {
    return <div className="board-row">
      {squares.map((square, sindex) => <Square key={sindex} value={square} />)}
    </div>;
  }

  let squares_per_row = 3;
  let total_squares = 9;

  return (
    <div className="board">
      {
        Array.from({ length: total_squares }, (_, i) => i + 1)
          .reduce((rows, currentValue) => {
            const arrTemp = rows[rows.length - 1];
            arrTemp.push(currentValue);
            if (arrTemp.length === squares_per_row) rows.push([]);
            return rows;
          }, [[]])
          .filter((chunk) => chunk.length) // Clean up last empty array
          .map((row, rindex) => <Row key={rindex} squares={row} />)
      }
    </div>
  );
}
