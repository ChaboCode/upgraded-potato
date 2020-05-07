import React, { Component, createRef } from 'react'

import Row from './Table/Row'
import HeaderRow from './Table/HeaderRow'
import './Table/Table.css'
import Selector from './Floaters/Selector/Selector'
import Details from "./Floaters/Details/Details";

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sup_regs: this.props.sup_regs,
      students: this.props.students,
      cells: Object.getOwnPropertyNames(this.props.sup_regs).length
    }
  }

  static getDerivedStateFromProps(nextProps, _prevState) {
    return {
      sup_regs: nextProps.sup_regs,
      students: nextProps.students,
      cells: Object.getOwnPropertyNames(nextProps.sup_regs).length
    }
  }

  render() {
    const selector = createRef(),
          details  = createRef()

    let students = []

    for (let i = 0; i < this.state.students.length; ++i) {
      students.push(<Row student={this.state.students[i]} cells={this.state.cells}
                         rowNumber={i} selector={selector}
                         regs={this.state.sup_regs} />)
    }
    
    const hrow = <HeaderRow regs={this.state.sup_regs} data={this.props.data} details={details}  />
    
    ///////////////////////////////////////
    return (
      <div style={{'overflowX': 'auto', 'overflowY': 'auto'}}>
        <Selector ref={selector} data={this.props.data} />
        <Details ref={details} data={this.props.data} />
        <table border="1px solid">
          <thead>{hrow}</thead>
          <tbody>{students}</tbody>
        </table>
      </div>
    )
  }
}

export default Table
