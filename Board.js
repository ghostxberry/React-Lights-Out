import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

function Board({ nrows = 6, ncols = 6 , chanceLightStartsOn = 0.15 }) {
  const [board, setBoard] = useState(createBoard());

  // Function to create the initial board
  function createBoard() {
    const initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      const row = [];
      for (let j = 0; j < ncols; j++) {
        row.push(randBoolean());
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  // Function to generate random boolean values based on chanceLightStartsOn
  function randBoolean() {
    return Math.random() < chanceLightStartsOn;
  }

  // Function to check if the player has won
  function hasWon() {
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j]) { // If any cell is lit, return false
          return false;
        }
      }
    }
    return true; // If no cell is lit, return true
  }
  // Function to flip cells around a given coordinate
  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const newBoard = oldBoard.map(row => [...row]);
      const [y, x] = coord.split("-").map(Number);
      
      const flipCell = (y, x) => {
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          newBoard[y][x] = !newBoard[y][x];
        }
      };
      
      flipCell(y, x);         // Flip the clicked cell
      flipCell(y - 1, x);     // Flip cell above
      flipCell(y + 1, x);     // Flip cell below
      flipCell(y, x - 1);     // Flip cell to the left
      flipCell(y, x + 1);     // Flip cell to the right
      
      return newBoard;
    });
  }

  // Function to render the game board
  function makeBoard() {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            isLit={cell}
            flipCellsAroundMe={() => flipCellsAround(`${rowIndex}-${colIndex}`)}
          />
        ))}
      </div>
    ));
  }

  // Render the game board and check for win
  return (
    <div>
  
      {hasWon() ? (
        <h1>Congratulations! You've won!</h1>
      ) : (
      
        <div>{makeBoard()}</div>
      )}
    </div>
  );
}

export default Board;
