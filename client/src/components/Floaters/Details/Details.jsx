import React, {createRef} from 'react'

import './Details.css'
import Floater from '../Floater';

class Details extends Floater {

  constructor(props) {
    super(props);

    this.name = createRef()
  }

  handleNameClick = e => {
    e.preventDefault()
    this.setState({
      modifyName: true
    })
  }

  handleNameChange = e => {
    e.preventDefault()
    this.setState({
      name: e.target.value
    })
  }

  save = async () => {
    this.setState({
      modifyName: false,
    })
    //TODO: Handle API interaction
    console.log('xd')
  }

  render = () => {
    return this.state.show ?
        <div id={'details-container'}>
          {/* TODO: Enable reg rename */}
          {this.state.modifyName ?
              <input id={'name-edit'} onChange={this.handleNameChange}
                     onKeyDown={this.handleNameKey} value={this.state.name} autoFocus/>
              :
              <span id={'name'} onClick={this.handleNameClick}>{this.state.name}</span>
          }
          <textarea id={'details'} placeholder={'Sobre la actividad...'}
                    onChange={this.handleDetailsChange} ref={this.details}>
            {this.state.details}
          </textarea>
        </div> : null
  }
}

export default Details
