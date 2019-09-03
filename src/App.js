import React from 'react';
import GridInput from './GridInput/GridInput.react'
import GameGrid from './GameGrid/GameGrid.react'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlayerOne: true, // Indicate current player
      virtualGrid: [], // Maintain box states
      scoreMap: {}, // Maintain scores
      gridSize: 0, // Input grid size
      markedGrids: 0, // Total marked grids
    }

    this._onGridSizeSubmit = this._onGridSizeSubmit.bind(this);
    this._onGridClick = this._onGridClick.bind(this);
  }

  _onGridSizeSubmit(gridSize) {
    if(gridSize <= 0) {
      alert('Please enter a valid grid size');
      return;
    }

    // Create a virtual grid that will be used to maintain state of each box
    // This will also be used to render grid with correct markings
    const virtualGrid = new Array(gridSize);

    // Score map will be used to maintain score for rows, cols & diagonals
    const scoreMap = {};
    scoreMap['diag-0'] = 0;
    scoreMap['diag-1'] = 0;

    for(let i=0; i<virtualGrid.length; i++) {
      scoreMap['row-'+i] = 0;
      scoreMap['col-'+i] = 0;
      virtualGrid[i] = Array(gridSize).fill('');
    }

    this.setState({
      gridSize,
      virtualGrid,
      scoreMap,
      isPlayerOne: true,
      markedGrids: 0
    });
  }

  _onGridClick(row, col) {
    const {
      virtualGrid,
      isPlayerOne,
      markedGrids,
      gridSize,
      scoreMap} = this.state;

    virtualGrid[row][col] = (isPlayerOne) ? 'X': 'O';

    // Add 1 for player 1, Subtract 1 for player 2
    const adder = (isPlayerOne) ? 1: -1;

    // Update scores for row, col or diagonal
    scoreMap['row-'+row] += adder;
    scoreMap['col-'+col] += adder;
    if(row === col) {
      scoreMap['diag-0'] += adder; // Left diagonal
    }
    if(gridSize - col - 1 === row) {
      scoreMap['diag-1'] += adder; // Right diagonal
    }

    this.setState({
      isPlayerOne: !isPlayerOne,
      markedGrids: markedGrids + 1,
      virtualGrid}, () => {
        console.log(markedGrids + 1, gridSize * gridSize);
        if(markedGrids + 1 >= gridSize) {
          setTimeout(() => this._checkWin(), 100);
        }
    });
  }

  _checkDraw() {
    const {markedGrids, gridSize} = this.state;

    if(markedGrids === (gridSize) * (gridSize)) {
      alert('Draw');
      setTimeout(() => this._onGridSizeSubmit(gridSize), 100);
    }
  }

  _checkWin() {
    const {scoreMap, gridSize} = this.state;

    // We only need to check if any of the row/col values are equal to +gridSize
    // or -gridSize. Eg. +4(Player 1 will win), -4(Player 2 will win)
    Object.values(scoreMap).forEach((value) => {
      if(value === gridSize) {
        alert('Player 1 won');
        this._onGridSizeSubmit(gridSize);
      }

      if(value === -gridSize) {
        alert('Player 2 won');
        this._onGridSizeSubmit(gridSize);
      }
    });

    this._checkDraw();
  }

  render() {
    const {gridSize, isPlayerOne} = this.state;

    return (
      <div className="App">
        <h1>
          <b>Tic Tac Toe</b>
        </h1>
        <GridInput onSubmit={this._onGridSizeSubmit} />
        {gridSize ? <div>Turn: {isPlayerOne ? 'Player 1': 'Player 2'}</div>: null }
        <GameGrid
          onGridClick={this._onGridClick}
          virtualGrid={this.state.virtualGrid}
          gridSize={gridSize}
        />
      </div>
    );
  }
}

export default App;
