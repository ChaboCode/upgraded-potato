import React, {Component, createRef} from 'react'
import './Details.css'

class Details extends Component {

  constructor(props) {
    super(props);

    this.details = createRef()
    this.name = createRef()

    this.state = {
      name: this.props.name,
      details: this.props.details,
      show: false,
      modifyName: false
    }

    this.handleDetailsChange = this.handleDetailsChange.bind(this)
    this.handleNameClick = this.handleNameClick.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleNameKey = this.handleNameKey.bind(this)
  }

  handleDetailsChange(e) {
    this.setState({
      details: e.target.value
    })
  }

  handleNameClick(e) {
    e.preventDefault()
    this.setState({
      modifyName: true
    })
  }

  handleNameChange(e) {
    e.preventDefault()
    this.setState({
      name: e.target.value
    })
  }

  handleNameKey(e) {
    e.key === 'Enter'  && this.save()
    e.key === 'Escape' && this.setState({
      modifyName: false
    })
  }

  save() {
    this.setState({
      modifyName: false,
    })
    //TODO: Handle API interaction
    console.log('xd')
  }

  render() {
    return this.state.show ?
        <div id={'details-container'}>
          {/*TODO: Enable reg rename*/}
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
