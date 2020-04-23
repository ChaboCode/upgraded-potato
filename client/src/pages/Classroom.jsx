import React, {Component, createRef} from 'react'
import axios from 'axios'

import './css/Classroom.css'

import Table from '../components/Table'
import Tabs from '../components/Tabs'

class Classroom extends Component {

  constructor(props) {
    super(props)
    this.groups = this.props.groups
    this.key = this.props._key
    this.tabs = createRef()

    this.state = {
      group: '',
      students: [],
      sup_regs: [],
      update: false,
      table: false
    }
    this.handleGroupClick = this.handleGroupClick.bind(this)
    this.updateGroup = this.updateGroup.bind(this)
    this.update = this.update.bind(this)
  }

  async handleGroupClick(e, group) {
    e.preventDefault()
    await this.updateGroup(group)
  }

  async updateGroup(group) {
    const students = await axios.post('http://localhost:5000/group/getStudentsByName', {name: group})
    const tabs = await axios.post('http://localhost:5000/teacher/getTabs', {key: this.key, group: group})
    let sup_regs
    try {
      sup_regs = await axios
          .post('http://localhost:5000/teacher/getGroupRegisters', {
            key: this.key,
            group: group,
            reg: this.tabs.current.state.actualTab
          })
    }
    catch(TypeError) {
      sup_regs = await axios
          .post('http://localhost:5000/teacher/getGroupRegisters', {
            key: this.key,
            group: group,
            reg: false
          })
    }
    this.setState({
      sup_regs: sup_regs.data,
      students: students.data,
      group: group,
      tabs: tabs.data,
      table: true
    })
  }

  async update() {
    await this.updateGroup(this.state.group)
  }

  render() {
    let groups = this.groups.map(group => {
      return (
          <li className="group"
              onClick={(e) => this.handleGroupClick(e, group)}><span>{group}</span></li>
      )
    })
    let data
    try {
      data = {
        group: this.state.group,
        teacher: this.key,
        reg: this.tabs.current.state.actualTab,
        update: this.updateGroup
      }
    }
    catch(TypeError) {
      data = {
        group: this.state.group,
        teacher: this.key,
        update: this.updateGroup
      }
    }

    return (
        <>
          <header id="top-bar">
            <span id="tech">Kaerdos</span> School Tool
          </header>

          <aside id="groups">
            <div className="sign">Grupos</div>
            {groups}
          </aside>

          {this.state.table ? (
              <>
              <Tabs ref={this.tabs} tabs={this.state.tabs}
                    update={this.update} group={this.state.group} />
              <div id="table">
                <Table sup_regs={this.state.sup_regs}
                       students={this.state.students} data={data} />
              </div></>
          ) : null}
          </>
    )
  }
}

export default Classroom
