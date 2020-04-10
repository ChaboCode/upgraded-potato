import React, { Component, Fragment } from 'react'

import './css/Classroom.css'

import Table from '../components/Table'

class Classrooom extends Component {

    handleGroupClick(e) {
        console.log('xd')
    }

    render () {
        return (
            <Fragment>
                <header id="top-bar">
                    <span id="tech">Kaerdos</span> School Tool
                </header>

                <aside id="groups">
                    <div className="sign">Grupos</div>
                    <li className="group"><a onClick={e => this.handleGroupClick(e)}>1o A</a></li>
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