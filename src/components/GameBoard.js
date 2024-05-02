export default function GameBoard({ updateGameboard, gameBoard }) {
  return (
    <ol className="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol className="gameboard-row">
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() =>
                    playerSymbol == null && updateGameboard(rowIndex, colIndex)
                  }
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
