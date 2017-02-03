import React, { Component } from 'react';
import './App.css';
import Tetris from './components/tetris/tetris'
class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Tetris settings={{ blockSize: 20, 
                            offset: 1, 
                            rows: 20, 
                            columns: 10, 
                            blockBorderWidth: 1,
                            blockBorderColor: 'white',
                            boardColor:'black',
                            blockBorderRadius:'10%',
                            intervalTimeInMiliSeconds: 1000,
                          }} 
        />
      </div>
    );
  }
}

export default App;
