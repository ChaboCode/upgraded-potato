import React, { Component, Fragment } from 'react'

import './css/Classroom.css'

import Table from '../components/Table'

class Classrooom extends Component {

    constructor(props) {
        super(props)
        this.groups = props.groups
    }

    handleGroupClick(e) {
        e.preventDefault()
        console.log('xd')
    }

    render() {
        let groups = this.groups.map(group => (
        <li className="group" 
            onClick={e => this.handleGroupClick(e)}><span>{group}</span></li>
        ))
        return (
            <Fragment>
                <header id="top-bar">
                    <span id="tech">Kaerdos</span> School Tool
                </header>

                <aside id="groups">
                    <div className="sign">Grupos</div>
                    {groups}
                    {/* <li className="group"><span onClick={e => this.handleGroupClick(e)}>1o A</span></li> */}
                </aside>

                <nav id="tabs">
                    <span className="tab">Asistencias</span>
                    <span className="tab">Trabajos</span>
                </nav>
                <div id="table">
                    <Table assignations={[1, 2, 3, 4]} students={['xd', 'xd']} />
                </div>
            </Fragment>
        )
    }
}

export default Classrooom