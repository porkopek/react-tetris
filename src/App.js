import React, { Component } from 'react';
import './App.css';
import Tetris from './components/tetris/tetris'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Tetris blockSize={30}/>
      </div>
    );
  }
}

export default App;
