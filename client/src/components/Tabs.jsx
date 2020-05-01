import React, { Component } from 'react'

class Tabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actualTab: this.props.tabs[0]
    }
  }

  handleTabClick(e, tab) {
    e.preventDefault()
    this.setState({
      actualTab: tab
    })
    this.props.update()
  }

  render() {
    let propsTabs = this.props.tabs
    let tabs = []
    tabs = propsTabs.map( tab => (
      <span className="tab"
                      onClick={e => this.handleTabClick(e, tab)}>
                  {tab}
                </span>
    ))

    return (
        <nav id="tabs">
          {tabs}
        </nav>
    )
  }
}

export default Tabs
