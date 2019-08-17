import React, { Component } from "react";
import Board from "./Board";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      stepNumber: 0,
      history: [{ squares: Array(9).fill(null) }]
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  handeClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1); //copy of previous state in history
    const current = history[history.length - 1]; // last item in history
    const squares = current.squares.slice(); //copy of squares and put it inside constant
    const winner = calculateWinner(squares);
    if (winner || squares[i]) {
      //if there is a winner no need to keep running OR  another player has selected that square, do not change that value
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O"; //to find if its X or O turn
    this.setState({
      history: history.concat({
        squares: squares //adding history to X or O
      }),
      xIsNext: !this.state.xIsNext, //changing to X or O with turnary
      stepNumber: history.length //now stepNumbere is however long history  is
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? "Go to # " + move : "Start the Game"; //start game or move to a previous game
      return (
        <li key={move}>
          <button
            onClick={() => {
              this.jumpTo(move);
            }}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner is " + winner;
    } else {
      status = "Next Player is " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board onClick={i => this.handeClick(i)} squares={current.squares} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  //helper function to return winner
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]; // possible combinations playesr can win the game

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a]; //returns X or O
    }
  }

  return null;
}
