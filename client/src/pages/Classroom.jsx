import React, { Component, Fragment } from 'react'
import axios from 'axios'

import './css/Classroom.css'

import Table from '../components/Table'

class Classrooom extends Component {

    constructor(props) {
        super(props)
        this.groups = props.groups
        this.key = this.props._key

        this.state = {
            group: '',
            students: [],
            sup_regs: [],
            update: false
        }
        this.handleGroupClick = this.handleGroupClick.bind(this)
        this.updateGroup = this.updateGroup.bind(this)
    }

    async handleGroupClick(e, group) {
        e.preventDefault()
        const students = await axios.post('http://localhost:5000/group/getStudentsByName', {name: group})
        
        const sup_regs = await axios.post('http://localhost:5000/teacher/getGroupRegisters', {key: this.key, group: group})
        this.setState({
            sup_regs: sup_regs.data.Actividades, //TODO
            students: students.data,
            group: group
        })
    }

    async updateGroup(group) {
        const students = await axios.post('http://localhost:5000/group/getStudentsByName', {name: group})
        
        const sup_regs = await axios.post('http://localhost:5000/teacher/getGroupRegisters', {key: this.key, group: group})
        this.setState({
            sup_regs: sup_regs.data.Actividades, //TODO
            students: students.data,
            group: group
        })
    }

    render() {
        let groups = this.groups.map(group => {
            return (
            <li className="group" 
                onClick={(e) => this.handleGroupClick(e, group)}><span>{group}</span></li>
            )
        })
        const data = {
            group: this.state.group,
            teacher: this.key,
            group_length: this.state.students.length,
            update: this.updateGroup
        }
        return (
            <Fragment>
                <header id="top-bar">
                    <span id="tech">Kaerdos</span> School Tool
                </header>

                <aside id="groups">
                    <div className="sign">Grupos</div>
                    {groups}
                </aside>

                <nav id="tabs">
                    <span className="tab">Asistencias</span>
                    <span className="tab">Trabajos</span>
                </nav>
                        <div id="table">
                            <Table sup_regs={this.state.sup_regs} students={this.state.students} data={data} />
                        </div>
            </Fragment>
        )
    }
}

export default Classrooom

