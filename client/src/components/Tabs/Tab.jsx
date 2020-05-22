import React, {Component, createRef} from 'react'
import {ContextMenuTrigger} from 'react-contextmenu'

import uris from '../../server'
import Axios from 'axios'

class Tab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rename: false,
      name: this.props.name,
    }
    this.tabRename = createRef()
  }

  handleDeleteClick = (e) => {
    e.preventDefault();
    console.log('xd')
    // Axios.post(`${uris}/teacher/deleteTab`, {
    //   key: this.props.teacher,
    //   tab: this.state.name,
    //   group: this.props.group,
    // });
  };

  handleRenameClick = (e, name) => {
    this.setState({
      rename: true
    })
  };

  render() {
    return (
          <ContextMenuTrigger
              id={"TAB"}
              holdToDisplay={1000}
              renameTab={this.handleRenameClick}
              deleteTab={this.handleDeleteClick}
              name={this.state.name}
          >
              <span
                  className="tab"
                  onClick={(e) => this.props.tabclick(e, this.state.name)}
                  renameTab={this.handleRenameClick}
              deleteTab={this.handleDeleteClick}
              name={this.state.name}
              >
                {this.state.rename ? (
                    <input id={'tabRename'} ref={this.tabRename} autoFocus />
                ) : this.state.name}
              </span>
          </ContextMenuTrigger>
    );
  }
}

export default Tab