import React, {Component} from 'react'
import axios from 'axios'
import {sha256} from 'js-sha256'

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
    const response = await axios.post('http://localhost:5000/teacher/getGroups', {key: this.state.key})
    const groups = response.data
    let names = []
    for (let key in groups) {
      names.push(key)
    }

    this.setState({
      logged: true,
      data: {
        groups: names
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
            <Classroom groups={this.state.data.groups} _key={this.state.key}/>
        )
        : (
            <div id="main-container">
              <div id="top-bar">
                Kaerdos
              </div>
              <div id="container">
                <span id="hello">Bienvenido</span> <br/>
                <span id="message">Ingrese su clave</span> <br/>
                <input onChange={this.handleChange} type="password" placeholder="Clave de profesor"/>
                <button onClick={e => this.handleClick(e)}>Entrar</button>
              </div>
            </div>
        )
  }
}

export default Home