import React from 'react';
import GridItem from '../GridItem/GridItem.react';
import './GameGrid.css';

class GameGrid extends React.Component {
  render() {
    const {gridSize, virtualGrid} = this.props;

    if(gridSize === 0) {
      return null;
    }

    return (
      <div className="GameGrid">
        <div className="gridContainer">
          {virtualGrid.map((gridRow, index) => (
              <div key={index} className="gridRow">
                {gridRow.map((gridItem, child_index) => (
                    <GridItem
                      mark={gridItem}
                      key={child_index}
                      row={index}
                      col={child_index}
                      gridSize={gridSize - 1}
                      onGridItemClick={(row, col) => {
                        this.props.onGridClick(row, col);
                      }}
                    />
                  ))}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default GameGrid;
