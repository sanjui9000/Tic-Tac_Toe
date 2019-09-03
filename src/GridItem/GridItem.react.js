import React from 'react';
import './GridItem.css';

class GridItem extends React.Component {
  constructor(props) {
    super(props);

    this._getGridItemClasses = this._getGridItemClasses.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  _onClick(row, col) {
    const {mark} = this.props;

    if(mark !== '') {
      alert('This box is already marked. Please choose a different box!')
      return;
    }

    this.props.onGridItemClick(row, col);
  }

  // This class is used for giving borders to boxes on edge
  _getGridItemClasses() {
    const {row, col, gridSize} = this.props;
    let gridItemClasses = 'gridItem ';

    // Bottom edge
    if(row === gridSize) {
      gridItemClasses += 'gridItemBottom';
    }

    // Right edge
    if(col === gridSize) {
      gridItemClasses += 'gridItemRight';
    }

    // Corner
    if(row === gridSize && col === gridSize) {
      gridItemClasses += ' gridItemCorner';
    }

    return gridItemClasses;
  }

  render() {
    const {row, col} = this.props;

    return (
      <div
        onClick={this._onClick.bind(this, row, col)}
        className={this._getGridItemClasses()}>
          <span className="gridMark">
            <b>
              {this.props.mark}
            </b>
          </span>
      </div>);
  }
}

export default GridItem;
