//@flow
import React, { Component } from 'react'
import  Tetromino  from './tetromino'
import { Block } from './block'
import { settings } from './settings'
import { createMatrix, rotate } from './helpers'
export default class Tetris extends Component {
  
  board: number[][]
  settings:{}
  state:{
    board:number[][],
    tetromino: Tetromino
  }
  constructor(props: {}) {
    super(props)
    this.settings = Object.assign({}, settings, props.settings)
    this.handleClick = this.handleClick.bind(this)
    this.state={
      board:this.initializeBoard(),
      tetromino: this.getNewTetromino()
    }
  }
  initializeBoard=()=>{
   return createMatrix( this.settings.columns, this.settings.rows)
  }
  getNewTetromino=():Tetromino=>{
    //floored random index to get a new tetromino
    
   
  }
  handleClick = (event:Event, index:{column:number, row:number}) => {
    const newBoard = this.state.board.slice()
    newBoard[index.column][index.row] =2
    this.setState({board:newBoard })
    
  }
  renderBoard = () => {
    return (
      this.state.board.map((column, columnIndex) =>
        column.map((row, rowIndex) => {
          return <Block
                    settings={this.settings}
                    key={rowIndex + ' ' + columnIndex}
                    index={{ column: columnIndex, row:rowIndex  }}
                    content={this.state.board[columnIndex][rowIndex]}
                    id={"id"+rowIndex + columnIndex}
                   onClick={this.handleClick}
          />
        })
      )
    )
  }
  render() {
    const index = Math.random()*Tetromino.getNumberOfTetrominoes() | 0
    return (
      <div>
      {this.renderBoard()}
      <Tetromino 
        settings={this.settings} 
        index ={index} 
        row={3} 
        column={4}
      />
      </div>
    )
  }
}