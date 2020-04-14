import React, { Component, Fragment } from 'react'
import axios from 'axios'
import {sha256} from 'js-sha256'

import './css/Classroom.css'

import Table from '../components/Table'

class Classrooom extends Component {

    constructor(props) {
        super(props)
        this.groups = props.groups
        this.key = this.props._key

        this.state = {
            students: [],
            sup_regs: []
        }
        this.handleGroupClick = this.handleGroupClick.bind(this)
    }

    async handleGroupClick(e, group) {
        e.preventDefault()
        const students = await axios.post('http://localhost:5000/group/getStudentsByName', {name: group})
        
        const groups = await axios.post('http://localhost:5000/teacher/getGroupRegisters', {key: this.key, group: group})
        const sup_regs = []
        for(let key in groups.data["Actividades"]) {
            sup_regs.push(key)
        }

        this.setState({
            sup_regs: sup_regs,
            students: students.data
        })
        this.render()
    }

    render() {
        let groups = this.groups.map(group => {
           // console.log(group)
            return (
            <li className="group" 
                onClick={(e) => this.handleGroupClick(e, group)}><span>{group}</span></li>
            )
        })
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
                    <Table sup_regs={this.state.sup_regs} students={this.state.students} />
                </div>
            </Fragment>
        )
    }
}

export default Classrooom

