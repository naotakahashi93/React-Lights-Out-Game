import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";


/** Game board of Lights out.
 *
 * 
 * The most sophisticated component. 
 * It will hold the state that represents the in-memory grid of true/false for lights-on/off. 
 * Since the state for the board lives here, this is also were the setState() calls will need to go — 
 * and therefore, the functions that call setState().
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {

    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
      //// function to randomly generate true or false
      const genRandtrueOrFalse = () => { 
        const tOrF = [ true, false]
        const randIdx = Math.floor(Math.random() * 2)
        return tOrF[randIdx]
      }
      
      //// fucntion that returns a row <tr> which has an array of "true" or "false" values which render to cells <Cell/> for the number of columns specified (ncols), 
      ////using Array.from and providing the length of the arr {length:ncols}
      //// and iterating over those undefined values (c) and giving them a true or false value via arrow fucntion 
      const generateRow = () => {
        return Array.from({length:ncols},c => (c = genRandtrueOrFalse()))
      }
      
      //// pushing the array of t/f values to the initial board which creates array of arrays
      initialBoard.push(Array.from({length:nrows}, r=> (r= generateRow())))

    return initialBoard
  }

  //// the game is WON when hasWon() returns true
  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.


  ////looping over the board Array and using .every to look through row first "r" and 
  ////see if the cells (c) in each row is getting the false 
  return board[0].every(r => r.every(c => c === false))
    
  }


  function flipCellsAround(coord) {
    console.log(coord, "CORRRDD")
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let boardCopy = [...oldBoard]

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy[0]);
      flipCell(y, x - 1, boardCopy[0]);
      flipCell(y, x + 1, boardCopy[0]);
      flipCell(y - 1, x, boardCopy[0]);
      flipCell(y + 1, x, boardCopy[0]);

      // TODO: return the copy

      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO

  if (hasWon()) {
    return <div>You Win!</div>;
  }


  let renderBoard = []

  const generateRow = (rowCoord) => {
    return <tr key={rowCoord}>
      {Array.from({length:ncols},
      (c, idx) => (c = 
      <Cell
      isLit={board[0][rowCoord][idx]}
      key={`${idx}-${rowCoord}`}
      flipCellsAroundMe={() => flipCellsAround(`${idx}-${rowCoord}`)}
    />
    ))}</tr>
  }
  
  //// pushing the array of t/f values to the initial board which creates array of arrays
  renderBoard.push(Array.from({length:nrows}, (r, idx)=> (r = generateRow(idx))))
// console.log(renderBoard, "RENDERBARD")



  return (<div>
    <table className="Board">
      <tbody>{renderBoard}</tbody>
    </table>
    <button onClick={()=> setBoard(createBoard())}> RESTART </button>
  </div>)
}

export default Board;
