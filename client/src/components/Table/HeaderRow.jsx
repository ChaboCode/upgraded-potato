import React, { Component } from 'react'

class HeaderRow extends Component {
    render() {
        this.regs = []
        for(let key in this.props.data) {
            this.regs.push(key)
        }
        let header = []
        header.push(<td className="name header">Alumnos</td>)
        header.push(
          this.regs.map(ass => (
              <th className="assignament" title={ass.desc}>
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
