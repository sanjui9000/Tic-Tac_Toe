import React from 'react';
import './GridInput.css';

class GridInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gridInput: 0
    };
  }

  render() {
    const {gridInput} = this.state;

    return (
      <div className="GridInput">
        <input
          className="GridInputBox"
          type="number"
          placeholder="Enter grid size"
          onChange={(e) => {
            this.setState({gridInput: parseInt(e.target.value)});
          }}
        />
        <button
          className="GridSubmitButton"
          onClick={() => {
            this.props.onSubmit(gridInput);
          }}>
          Create Game
        </button>
        <button
          className="GridSubmitButton"
          onClick={() => {
              this.props.onSubmit(gridInput);
          }}>
          Reset Game
        </button>
      </div>
    );
  }
}

export default GridInput;
