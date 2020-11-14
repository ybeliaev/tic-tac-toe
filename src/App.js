import React, {useState} from 'react';

import './styles/root.scss';
import Board from './components/Board';
import { calculateWinner } from './helpers';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXnext, setIsXnext] = useState(false);

  const winner = calculateWinner(board)
  console.log("Winner: ", winner)

  const message = winner ? `Winner is ${winner}` : `Next player is ${isXnext?"X":"O"}`

  const handleSquareClick = (position) => {
    if (board[position] || winner) {
      return;
    }
    setBoard((prev) => {
      console.log("prev state: ", prev);
      return prev.map((square, pos) => {
        if (pos === position) {
          return isXnext ? "X" : "O";
        }
        return square;
      });
    });
    setIsXnext((prev) => !prev);
  };
  return (
    <div className="app">      
        <h1>Lean React</h1> 
        <h2>{message}</h2>  
        <Board handleSquareClick={handleSquareClick} board={board}/>   
    </div>
  );
}

export default App;
