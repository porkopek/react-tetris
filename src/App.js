import React, { Component } from 'react';
import './App.css';
import Tetris from './components/tetris/tetris'
class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Tetris settings={{ blockSize: 20, 
                            offset: 1.3, 
                            rows: 20, 
                            columns: 10, 
                            blockBorderColor: 'white', 
                            boardColor:'white' }} 
        />
      </div>
    );
  }
}

export default App;
