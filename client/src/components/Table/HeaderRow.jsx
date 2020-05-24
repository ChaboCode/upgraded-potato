import React, {Component} from 'react'
import axios from 'axios'

import uris from '../../server'

class HeaderRow extends Component {

  constructor(props) {
    super(props)

    this.state = {
      addNew: false,
      value: ''
    }
  }

  handleNewClick = () => {
    this.setState({addNew: true})
  }

  newRegister =  async reg => {
    await axios.post(`${uris}/teacher/addNewGroupRegister`, {
      key: this.props.data.teacher,
      group: this.props.data.group,
      group_length: this.props.data.group_length,
      reg: this.props.data.reg,
      new_reg: reg
    })
    this.props.data.update(this.props.data.group)
  }


  handleInputChange = e => {
    e.preventDefault()
    this.setState({value: e.target.value})
  }

  escFunction = async e => {
    if (e.key === 'Escape') {
      this.setState({addNew: false})
    } else if (e.key === 'Enter') {
      await this.newRegister(this.state.value)
      this.setState({addNew: false, value: ''})
    }
  }

  handleInputBlur = e => {
    e.preventDefault()
    this.setState({addNew: false})
  }

  // TODO: Implement this
  showActivityDetails = e => {
    e.preventDefault()
    console.log(e.target)
  }

  render = () => {
    let header = []
    header.push(<td className="name header">Alumnos</td>)
    //TODO: Implement list's numbers
    for(let reg of this.props.regs) {
      header.push(
          <th
            className="assignment"
            onClick={this.showActivityDetails} >
            <div>
              {/* TODO: Implement reg.desc */}
              <span title={reg.name /*Here*/}>{reg.name.split(".")[0]}</span>
            </div>
          </th>
      )
    }
    
    if (this.state.addNew) {
      header.push(
          <td className="assignment add-assign" onClick={e => this.handleNewClick(e)}>
            <div>
              <input id="add-new-reg" placeholder="Actividad..." onKeyUp={this.escFunction}
                     onChange={this.handleInputChange} onBlur={this.handleInputBlur}
                     value={this.state.value} autoFocus/>
            </div>
          </td>
      )
    } else {
      header.push(
          <td className="assignment add-assign" onClick={e => this.handleNewClick(e)}>
            <div>
              <span>A&ntilde;adir ...</span>
            </div>
          </td>
      )
    }

    return <tr>{header}</tr>
  }
}

export default HeaderRow
