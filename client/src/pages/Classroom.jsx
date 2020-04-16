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
            students: null,
            sup_regs: null
        }
        this.handleGroupClick = this.handleGroupClick.bind(this)
    }

    async handleGroupClick(e, group) {
        e.preventDefault()
        const students = await axios.post('http://localhost:5000/group/getStudentsByName', {name: group})
        
        const sup_regs = await axios.post('http://localhost:5000/teacher/getGroupRegisters', {key: this.key, group: group})
        this.setState({
            sup_regs: sup_regs.data.Actividades,
            students: students.data
        })
        this.render()
    }

    render() {
        let groups = this.groups.map(group => {
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
                {this.state.students != null ? (
                        <div id="table">
                            <Table sup_regs={this.state.sup_regs} students={this.state.students} />
                        </div>
                        ) : <></>
                }
                
            </Fragment>
        )
    }
}

export default Classrooom

