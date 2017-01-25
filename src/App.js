import React, { Component } from 'react';
import './App.css';
import Tetris from './components/tetris/tetris'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Tetris settings={{blockSize:30, offset:1.1,rows:20,columns:10, blockBorderColor:'black'}}/>
      </div>
    );
  }
}

export default App;
