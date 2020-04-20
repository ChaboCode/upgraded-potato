import React, { Component, Fragment } from 'react'

class Row extends Component {
  constructor(props) {
    super(props)

    this.cells = this.props.cells
    this.student = this.props.student
    this.rowNumber = this.props.rowNumber
    this.regs = []

    for(let key in this.props.regs) {
        this.regs.push(this.props.regs[key].regs[this.rowNumber])
    }

    for(let i = 0; i < this.regs.length; ++i) {
      if(this.regs[i] === true) {
        this.regs[i] = -1
      }
      else if(this.regs[i] === false) {
        this.regs[i] = -2
      }
    }
  }

  handleClick(e, row, col) {
    e.preventDefault()
    this.props.selector.current.show(row, col)
  }

  render() {
    let row = []
    for (let i = 0; i < this.cells; ++i) {
      row.push(
        <td
          className="activity"
          row={this.rowNumber}
          col={i}
          onClick={e => this.handleClick(e, this.rowNumber, i, this.cells)}
          > 
          {this.regs[i]}
        </td>
      )
    }

    return <Fragment key={this.rowNumber}>
        <tr>
          <td className="name">{this.student}</td>
          {row}
        </tr>
    </Fragment>
  }
}

export default Row
