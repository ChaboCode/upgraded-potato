import React from "react";
import Floater from "../Floater";

import "./RandomInput.css";

class RandomInput extends Floater {
  save = async () => {

  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      value: e.target.value,
    });
  };

  handleInputFocus = (e) => {
    e.preventDefault();
    e.target.select();
  };

  render() {
    return (
      this.state.show && (
        <div
          className="floater-container"
          style={this.state.style}
          ref={this.setWrapperRef}
        >
          <input
            class="floater-input"
            id="random-input"
            placeholder="Pestaña..."
            ref={super.valueInput}
            value={this.state.value}
            onChange={this.handleChange}
            onKeyDown={(e) => this.handleKeyPressed(e, this.save)}
            onFocus={(e) => this.handleInputFocus(e)}
            autoFocus
          />
        </div>
      )
    );
  }
}

export default RandomInput;
