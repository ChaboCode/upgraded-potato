import React, { Component, createRef } from 'react'
import axios from 'axios'

import './selector.css'

class Selector extends Component {

  constructor(props) {
    super(props)

    this.state = {
      style: {},
      score: '',
      pos: {
        row: 0,
        col: 0
      },
      show: false
    }

    this.score = createRef()

    this.saveScore = this.saveScore.bind(this)
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.keyPressed = this.keyPressed.bind(this)
  }

  show(row, col) {
    this.setState({
      style: {
        float: 'left',
        top: (206 + ((row) * 37)).toString() + 'px',
        left: (394 + ((col - 1) * 28)).toString() + 'px'
      },
      score: '',
      pos: {
        row: row,
        col: col
      },
      show: true
    })
    if(this.score.current !== null) {
      this.score.current.focus()
      this.score.current.value = ''
    }
  }

  hide() {
    this.setState({
      show:false
    })
  }

  saveScore() {
     this.state.score && axios.post('http://localhost:5000/teacher/updateRegisterOnIndex', {
      teacher: this.props.data.teacher,
      student: this.state.pos.row,  //
      reg: this.state.pos.col, //
      group: this.props.data.group,
      sup_reg: this.props.data.reg,  //
      points: this.state.score
    }).then(_r => {
      this.props.data.update(this.props.data.group)
    })
    this.hide()
  }

  handleChange(e) {
    this.setState({
      score: e.target.value
    })
  }

  keyPressed(e) {
    console.log(e.key)
    e.key === "Enter" && this.saveScore()
    e.key === "Escape" && this.hide()
  }

  render() {
    return this.state.show ? (
      <div id="selectorContainer" style={this.state.style}>
        <input id="score" placeholder="Puntos" type="number"
               ref={this.score} onChange={e => this.handleChange(e)}
               value={this.state.score} onKeyDown={this.keyPressed}
               autoFocus />
        <button id="quit" onClick={this.hide}>Esc</button>
        <button id="storeScore" onClick={this.saveScore}>OK</button>
      </div>
    ) : null
  }
}

export default Selector
