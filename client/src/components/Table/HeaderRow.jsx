import React, { Component } from 'react'

class HeaderRow extends Component {
  render() {
    const data = this.props.data
    let header = []
    header.push(<td className="name header">Alumnos</td>)
    header.push(
      data.map(ass => (
        <th className="assignament">
          <div>
            <span>{ass}</span>
          </div>
        </th>
      ))
    )

    return <tr>{header}</tr>
  }
}

export default HeaderRow
