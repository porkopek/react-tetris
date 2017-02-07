import React, { Component } from 'react';
import './App.css';
import Tetris from './components/tetris/tetris'
class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Tetris settings ={{ blockSize: 4, 
                            offset: 2, 
                            rows: 20, 
                            columns: 10, 
                            blockBorderWidth: 5,
                            boardColor:'black',
                            blockBorderRadius:'30%',
                            intervalTimeInMiliSeconds: 1000,
                            blockOutline:0,
                            animation:false,
                            boardBorderColor:'transparent'
                            
                            
                          }} 
        />
        {/*<Tetris settings={{ blockSize: 5, 
                            offset: 5, 
                            rows: 20, 
                            columns: 10, 
                            blockBorderWidth: 14,
                            boardColor:'white',
                            blockBorderRadius:'0%',
                            intervalTimeInMiliSeconds: 1000,
                            blockOutline:3,
                            animation:false,
                            boardBorderColor:'#e6e6e6',
                            buttonsBackgroundColor:'white',
                            buttonsColor:'black'
                            
                            
                          }} 
        />*/}
      </div>
    );
  }
}

export default App;
