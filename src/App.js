export default function Board() {
  function Square({ value }) {
    return <button className="square">{value}</button>;
  }

  let rows = 3;
  let squares_per_row = 3;
  let total_squares = 9;
  let count_squares = 0;
  let rows_elements = [];
  let squares_elements = [];

  const group_rows_squares = Array.from(
    { length: total_squares }, (_, i) => i + 1
  )
    .reduce((groups, currentValue) => {
      const arr = groups[groups.length - 1];
      arr.push(currentValue);
      if (arr.length === 3) groups.push([]);
      return groups;
    }, [[]])
    .filter((chunk) => chunk.length);
  
  // return (
  //   <>
  //     <div className="board-row">
  //       <Square key={i++} value={i++} />
  //       <Square key={i++} value={i++} />
  //       <Square key={i++} value={i++} />
  //     </div>
  //     <div className="board-row">
  //       <Square key={i++} value={i++} />
  //       <Square key={i++} value={i++} />
  //       <Square key={i++} value={i++} />
  //     </div>
  //     <div className="board-row">
  //       <Square key={i++} value={i++} />
  //       <Square key={i++} value={i++} />
  //       <Square key={i++} value={i++} />
  //     </div>
  //   </>
  // );
}
