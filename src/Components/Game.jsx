import React, { useState } from 'react'
import Board from './Board'
import { calculateWinner } from '../helper'

const Game = () => {
  // All the moves made in the game are stored in an state called history. 
  // With this array, you can achieve these movements and actually go to the past of the game.
  const [history, setHistory] = useState([Array(9).fill(null)]);

  // We store the number of the house where the player is now in stepNumber
  const [stepNumber, setStepNumber] = useState(0);

  // To find out which player's turn it is, we use booleans, which we store in the xIsNext state
  const [xIsNext, setXisNext] = useState(true);

  // Determine the winner of the game
  const winner = calculateWinner(history[stepNumber]);

  // Show players X or O
  const xO = xIsNext ? 'X' : 'O';


  // This function handles all events that occur when buttons are clicked
  const handleClick = (i) => {
    // All moves made so far are placed in the new historyPoint array
    const historyPoint = history.slice(0, stepNumber + 1);

    // We need one last house. The last house is the last member of the historyPoint array. 
    // We store it in the current variable
    const current = historyPoint[stepNumber];

    const squares = [...current];

    // return if won or occupied
    if (winner || squares[i]) return;

    // select square
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  }

  // This function is for jumping between all moves. 
  // This function allows you to access all the moves you have made so far and go back to the same move in the game.
  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  //This function is for making jump buttons. By using this function, we can access past movements. 
  // The number of buttons that this function creates is equal to the number of moves.
  const renderMoves = () => 
    history.map((_step, move) => {
      const destination = move ? `Go To Move ${move}` : 'Go To Start';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  return (
    <>
      <h1>React Tic Tac Toe - With Hooks</h1>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          <h3>Past Moves</h3>
          {renderMoves()}
        </div>
        <h3>
          {winner ? 'Winner is : ' + winner : 'Next Player : ' + xO}
        </h3>
      </div>
    </>
  )
}

export default Game;