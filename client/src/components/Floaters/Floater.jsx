import { Component, createRef } from 'react'

import './Floater.css'

class Floater extends Component {
  constructor(props) {
    super(props)

    this.state = {
      style: {},
      value: '',
      pos: {
        row: 0,
        col: 0
      },
      show: false,
    }

    this.offsets = {
      left: _ => 0,
      top: _ => 0
    }

    this.valueInput = createRef()
    this.timeout = null
  }

  show = (row, col, val) => {
    this.setState({
      //FIXME: XD
      style: {
        float: 'left',
        top: this.offsets.top(row).toString() + 'px',
        left: this.offsets.left(col).toString() + 'px'
      },
      value: val ? val.toString() : '',
      pos: {
        row: row,
        col: col
      },
      show: true
    })

    if(this.valueInput.current !== null) {
      this.valueInput.current.focus()
      this.valueInput.current.value = ''
    }
  }

  hide = () => {
    this.setState({
      show: false,
      value: ''
    })
  }

  handleClickOutside = e => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.hide()
    }
  }

  handleKeyPressed = (e, onEnter) => {
    e.key === "Enter" && onEnter()
    e.key === "Escape" && this.hide()
  }

  setWrapperRef = node => {
    this.wrapperRef = node
  }

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
}

export default Floater
