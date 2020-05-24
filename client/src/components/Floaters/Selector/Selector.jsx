import React from 'react'
import axios from 'axios'

import Floater from '../Floater'
import './selector.css'
import uris from '../../../server'

class Selector extends Floater {
  constructor() {
    super()

    this.offsets = {
      left: col => (394 + ((col - 1) * 28)),
      top: row => (206 + ((row) * 37))
    }
  }
  
  save = async () => {
    this.state.value && await axios.post(`${uris}/teacher/updateRegisterOnIndex`, {
      teacher: this.props.data.teacher,
      student: this.state.pos.row,  //
      reg: this.state.pos.col, //
      group: this.props.data.group,
      sup_reg: this.props.data.reg,  //
      points: this.state.value
    })
    this.props.data.update(this.props.data.group)
    this.hide()
  }

  handleChange = e => {
    e.preventDefault()
    this.setState({
      value: e.target.value
    })
  }

  handleInputFocus = e => {
    e.preventDefault()
    e.target.select()
  }

  render = () => {
    return this.state.show && !this.state.scrolling ? (
      <div id="selectorContainer" 
           style={this.state.style} 
           ref={this.setWrapperRef}>
        <input id="score" 
               placeholder="Puntos" 
               type="number"
               ref={super.valueInput} 
               onChange={e => this.handleChange(e)}
               value={this.state.value} 
               onKeyDown={e => this.handleKeyPressed(e, this.save)}
               onFocus={e => this.handleInputFocus(e)}
               autoFocus />
        
        <button id="quit" 
                className={'sel-button'} 
                onClick={this.hide}
                >
                 Esc
        </button>
        <button id="storeScore" 
                className={'sel-button'} 
                onClick={this.save}
                >
                  OK
        </button>
      </div>
    ) : null
  }
}

export default Selector
