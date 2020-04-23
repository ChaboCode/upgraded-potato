import React, {Component} from 'react'
import axios from 'axios'

class HeaderRow extends Component {

  constructor(props) {
    super(props)

    this.state = {
      addNew: false,
      value: ''
    }
    this.escFunction = this.escFunction.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
  }

  handleNewClick(_e) {
    this.setState({addNew: true})
  }

  async newRegister(reg) {
    console.log(this.props.data.reg)
    await axios.post('http://localhost:5000/teacher/addNewGroupRegister', {
      key: this.props.data.teacher,
      group: this.props.data.group,
      group_length: this.props.data.group_length,
      reg: this.props.data.reg,
      new_reg: reg
    })
    this.props.data.update(this.props.data.group)
  }


  handleInputChange(e) {
    e.preventDefault()
    this.setState({value: e.target.value})
  }

  async escFunction(e) {

    e.preventDefault()
    if (e.key === 'Escape') {
      this.setState({addNew: false})
    } else if (e.key === 'Enter') {
      //TODO
      console.log('xd')
      await this.newRegister(this.state.value)
      console.log('xd2')
      this.setState({addNew: false, value: ''})
    }
  }

  handleInputBlur(e) {
    e.preventDefault()
    this.setState({addNew: false})
  }

  render() {
    this.regs = []
    for (let key in this.props.regs) {
      this.regs.push(key)
    }
    let header = []
    header.push(<td className="name header">Alumnos</td>)
    header.push(
        this.regs.map(ass => (
            <th className="assignment" title={ass.desc}>
              <div>
                <span>{ass}</span>
              </div>
            </th>
        ))
    )
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
