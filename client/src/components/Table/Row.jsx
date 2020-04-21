import React, { Component, Fragment } from 'react'

class Row extends Component {
  constructor(props) {
    super(props)

    let regs = []
    for(let key in this.props.regs) {
        regs.push(this.props.regs[key].regs[this.rowNumber])
    }

    for(let i = 0; i < regs.length; ++i) {
      if(regs[i] === true) {
        regs[i] = -1
      }
      else if(regs[i] === false) {
        regs[i] = -2
      }
    }

    this.state = {
      cells: this.props.cells,
      student: this.props.student,
      rowNumber: this.props.rowNumber,
      regs: regs
    }
  }

  static getDerivedStateFromProps(nextProps, _prevState) {
    let regs = []
    for(let key in nextProps.regs) {
      regs.push(nextProps.regs[key].regs[nextProps.rowNumber])
    }

    for(let i = 0; i < regs.length; ++i) {
      if(regs[i] === true) {
        regs[i] = -1
      }
      else if(regs[i] === false) {
        regs[i] = -2
      }
    }

    return {
      cells: nextProps.cells,
      student: nextProps.student,
      rowNumber: nextProps.rowNumber,
      regs: regs
    }
  }

  handleClick(e, row, col) {
    e.preventDefault()
    this.props.selector.current.show(row, col)
  }

  render() {
    let row = []
    for (let i = 0; i < this.state.cells; ++i) {
      row.push(
        <td
          className="activity"
          row={this.state.rowNumber}
          col={i}
          onClick={e => this.handleClick(e, this.state.rowNumber, i, this.state.cells)}
          > 
          {this.state.regs[i]}
        </td>
      )
    }

    return <Fragment key={this.state.rowNumber}>
        <tr>
          <td className="name">{this.state.student}</td>
          {row}
        </tr>
    </Fragment>
  }
}

export default Row
