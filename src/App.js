import React, {useState} from 'react';

import './styles/root.scss';
import Board from './components/Board';
import { calculateWinner } from './helpers';

function App() {
  const [history, setHistory] = useState([{board: Array(9).fill(null), isXnext: true},]);
  const [currentMove, setCurrentMove] = useState(0);

  const current = history[currentMove]

  const winner = calculateWinner(current.board)
  console.log("Winner: ", winner)

  const message = winner ? `Winner is ${winner}` : `Next player is ${current.isXnext?"X":"O"}`

  const handleSquareClick = (position) => {
    if (current.board[position] || winner) {
      return;
    }
    setHistory((prev) => {
      const last = prev[prev.length - 1]
      console.log("prev state: ", prev);
      const newBoard = last.board.map((square, pos) => {
        if (pos === position) {
          return last.isXnext ? "X" : "O";
        }
        return square;
      });
      return prev.concat({board: newBoard, isXnext: !last.isXnext})
    });
    setCurrentMove(prev=>prev+1)
  };
  return (
    <div className="app">      
        <h1>Lean React</h1> 
        <h2>{message}</h2>  
        <Board handleSquareClick={handleSquareClick} board={current.board}/>   
    </div>
  );
}

export default App;
