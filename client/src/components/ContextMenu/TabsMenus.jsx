import React from 'react'

import {ContextMenu, MenuItem, connectMenu} from 'react-contextmenu'

const TabsMenu = props => {
  let name = props.trigger ? props.trigger.target.innerText : ''

  const handleDeleteClick = (e, name) => {
    console.log('xd')
    //TODO
  }

  const handleRenameClick = (e, name) => {
    //TODO
  }

  return (
    <ContextMenu id={'TAB'}>
      <MenuItem onClick={ e => handleRenameClick(e, name)}>
        Renombrar
      </MenuItem>
      <MenuItem onClick={ e =>handleDeleteClick(e, name)}>
        Eliminar la pesta&ntilde;a {name}
      </MenuItem>
    </ContextMenu>
  )
}

export default connectMenu('TAB')(TabsMenu)
