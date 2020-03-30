import React, { Component, createRef } from 'react'

import './selector.css'

class Selector extends Component {

  constructor(props) {
    super(props)

    this.state = {
      display: 'none'
    }

    this.score = createRef()

    this.handleEnterClick = this.handleEnterClick.bind(this)
    this.show = this.show.bind(this)
  }

  show(row, col) {
    this.setState({
      float: 'left',
      top: (206 + ((row)*37)).toString() + 'px',
      left: (394 + ((col - 1) * 28)).toString() + 'px',
      display: 'block'
    })
    console.log(this.state)
    this.score.current.focus()
  }

  hide() {
    this.setState({
      display: 'none'
    })
  }

  handleEnterClick(e) {
    e.preventDefault()
    this.hide()
  }

  render() {
    return (
      <div id="selectorContainer" style={this.state}>
        <input id="score" placeholder="Puntos" type="number" ref={this.score} />
        <button id="storeScore" onClick={e => this.handleEnterClick(e)}>OK</button>
      </div>
    )
  }
}

export default Selector
