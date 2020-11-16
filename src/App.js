import React, {useState} from 'react';

import './styles/root.scss';
import Board from './components/Board';
import History from './components/History';
import StatusMessage from './components/StatusMessage';

import { calculateWinner } from './helpers';

function App() {
  const [history, setHistory] = useState([{board: Array(9).fill(null), isXnext: true},]);
  const [currentMove, setCurrentMove] = useState(0);

  const current = history[currentMove]

  const winner = calculateWinner(current.board)
  console.log("Winner: ", winner)

  

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

  const moveTo = (move) => {
    setCurrentMove(move)
  }

  return (
    <div className="app">      
        <h1>Lean React</h1> 
        <StatusMessage winner={winner} current={current}/>
        <Board handleSquareClick={handleSquareClick} board={current.board}/>   
        <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>
  );
}

export default App;
