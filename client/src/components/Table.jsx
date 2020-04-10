import React, { Component, Fragment, createRef } from 'react'

import Row from './Table/Row'
import HeaderRow from './Table/HeaderRow'
import './Table/Table.css'
import Selector from './Selector/Selector'

class Table extends Component {
  render() {
    const selector = createRef()

    const assignations = this.props.assignations
    const cells = assignations.length
    const pstudents = this.props.students
    let students = []

    for (let i = 0; i < pstudents.length; ++i) {
      students.push(<Row student={pstudents[i]} cells={cells} rowNumber={i} selector={selector} />)
    }
    
    const hrow = <HeaderRow data={assignations} />
    
    ///////////////////////////////////////
    return (
      <Fragment>
        <table border="1px solid">
          <thead>{hrow}</thead>
          <tbody>{students}</tbody>
          <Selector ref={selector} />
        </table>
        <Selector />
      </Fragment>
    )
  }
}

export default Table
