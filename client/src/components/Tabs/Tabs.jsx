import React, { Component } from 'react'
import {ContextMenuTrigger} from 'react-contextmenu'

import TabsMenus from '../ContextMenu/TabsMenus'

import './Tabs.css'

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
    let tabs = propsTabs.map( tab => (
      <ContextMenuTrigger 
        id={'TAB'}
        holdToDisplay={1000}
        name={tab}
        collect={this.props}
        >
          <span className="tab"
                onClick={e => this.handleTabClick(e, tab)}
                >
                  {tab}
          </span>
      </ContextMenuTrigger>
    ))

    tabs = [...tabs, (
      <span className="tab"
            id="addTab"
            >
              +
      </span>

    )]

    return (
        <nav id="tabs">
          {tabs}
          <TabsMenus/>
        </nav>
    )
  }
}

export default Tabs
