import React, { Component } from 'react';
import './App.css';
import Tetris from './components/tetris/tetris'
class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Tetris settings={{ blockSize: 5, 
                            offset: 4, 
                            rows: 20, 
                            columns: 10, 
                            blockBorderWidth: 8,
                            boardColor:'black',
                            blockBorderRadius:'30%',
                            intervalTimeInMiliSeconds: 1000,
                            blockOutline:2,
                          }} 
        />
      </div>
    );
  }
}

export default App;
