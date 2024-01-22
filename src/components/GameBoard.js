import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({activePlayerSymbol,onUpdateActivePlayer}) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function updateGameboard(rowIndex, colIndex) {
    setGameBoard((prevGameboard) => {
      ///
      /// not good approach, as we should not alter the reference
      /// variables diretly, as it could casue issues in app
      /// some other setState update is scheduled.
      ///

      //   prevGameboard[rowIndex][colIndex] = "X";
      //   return prevGameboard;

      ///
      /// instead update the reference types in an immutable way
      /// using a deep copy
      ///

      const updatedBoard = [...prevGameboard.map((innerRow) => [...innerRow])];
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updatedBoard;
    });

    onUpdateActivePlayer();

  }

  return (
    <ol className="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => updateGameboard(rowIndex, colIndex)}>
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
