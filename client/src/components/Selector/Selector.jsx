import React, { Component, createRef } from 'react'

import './selector.css'

class Selector extends Component {

  constructor(props) {
    super(props)

    this.state = {
      style: {
        display: 'none',
      },
      score: ''
    }

    this.score = createRef()

    this.handleEnterClick = this.handleEnterClick.bind(this)
    this.show = this.show.bind(this)
  }

  show(row, col) {
    this.setState({
      style: {
        float: 'left',
        top: (206 + ((row) * 37)).toString() + 'px',
        left: (394 + ((col - 1) * 28)).toString() + 'px',
        display: 'block'
      },
      score: ''
    })
    this.score.current.focus()
    this.score.current.value = ''
  }

  hide() {
    this.setState({
      style: {
        display: 'none',
      }
    })
  }

  handleEnterClick(e) {
    e.preventDefault()
    this.hide()
  }

  handleChange(e) {
    this.setState({
      score: e.target.value
    })
  }

  render() {
    return (
      <div id="selectorContainer" style={this.state.style}>
        <input id="score" placeholder="Puntos" type="number" 
        ref={this.score} onChange={e => this.handleChange(e)} />
        <button id="storeScore" onClick={e => this.handleEnterClick(e)}>OK</button>
      </div>
    )
  }
}

export default Selector
