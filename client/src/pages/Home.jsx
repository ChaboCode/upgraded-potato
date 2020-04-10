import React, { Component } from 'react'
import axios from 'axios'
import { sha256 } from 'js-sha256'

import './css/Home.css'

import Classroom from './Classroom'

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            logged: false,
            key: ''
        }

        this.handleChange = this.handleChange.bind(this)
    }

    async handleClick(e) {
        e.preventDefault()
        //TODO: implement this
        const response = await axios.post('http://localhost:5000/teacher/getGroups', {key: this.state.key})
        //console.log(response)
        const groups = response.data
        console.log(groups)
        let name = []
        for(let i = 0; i < groups.lenght; ++i) {
            name.push(await axios.post('http://localhost:5000/group/getNameById', {id: groups[i].group}))
        }
        console.log(name)



        this.setState({
            logged: true,
            data: {
                groups: [
                    '1a',
                    '1b',
                    '1d',
                ]

            }
        })
    }

    handleChange(e) {
        e.preventDefault()
        this.setState({
            logged: this.state.logged,
            key: sha256(e.target.value)
        })
    }

    render() {
        return this.state.logged ?
        (
            <Classroom />
        )
         : (
            <div id="main-container">
                <div id="top-bar">
                    Kaerdos
                </div>
                <div id="container">
                    <span id="hello">Bienvenido</span> <br/>
                    <span id="message">Ingrese su clave</span> <br />
                    <input onChange={this.handleChange} type="password" placeholder="Clave de profesor"/>
                    <button onClick={e => this.handleClick(e)}>Entrar</button>
                </div>
            </div>
        )
    }
}

export default Home