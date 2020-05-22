import React, { Component } from 'react';
import './App.css';
import Home from './pages/Home'
import api from './api'

class App extends Component {
  render() {
    api.sayXD()
    return (
    <Home />
    );
  }
}

export default App;
