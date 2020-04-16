import React, { Component, Fragment, createRef } from 'react'

import Row from './Table/Row'
import HeaderRow from './Table/HeaderRow'
import './Table/Table.css'
import Selector from './Selector/Selector'

class Table extends Component {
  render() {
    const selector = createRef()

    const sup_regs = this.props.sup_regs
    const cells = Object.getOwnPropertyNames(sup_regs).length
    const pstudents = this.props.students
    let students = []

    for (let i = 0; i < pstudents.length; ++i) {
      students.push(<Row student={pstudents[i]} cells={cells} rowNumber={i} selector={selector} regs={sup_regs}/>)
    }
    
    const hrow = <HeaderRow data={sup_regs} />
    
    ///////////////////////////////////////
    return (
      <Fragment>
      <Selector ref={selector} />
        <table border="1px solid">
          <thead>{hrow}</thead>
          <tbody>{students}</tbody>
        </table>
      </Fragment>
    )
  }
}

export default Table
