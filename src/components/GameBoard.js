import { INITIAL_GAMEBOARD as initialGameBoard } from "../commons/Constants";

export default function GameBoard({updateGameboard, gameTurns}) {
let gameBoard = initialGameBoard;

for (const itr of gameTurns) {
    const {square, player} = itr;
    const {row,col} = square;
    gameBoard[row][col] = player;
}

  return (
    <ol className="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() =>playerSymbol==null && updateGameboard(rowIndex, colIndex)}>
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
