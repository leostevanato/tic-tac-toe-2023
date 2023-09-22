export default function Board() {
  function Square({ value }) {
    return <button className="square">{value}</button>;
  }

  let squares_per_row = 3;
  let total_squares = 9;

  return Array.from(
    { length: total_squares }, (_, i) => i + 1
  )
    .reduce((rows, currentValue) => {
      const arrTemp = rows[rows.length - 1];
      arrTemp.push(currentValue);
      if (arrTemp.length === squares_per_row) rows.push([]);
      return rows;
    }, [[]])
    .filter((chunk) => chunk.length) // Clean up last empty array
    .map((row, rindex) => (
      <div key={rindex} className="board-row">
        {row.map((square, sindex) => <Square key={sindex} value={square} />)}
      </div>
    ));
}
