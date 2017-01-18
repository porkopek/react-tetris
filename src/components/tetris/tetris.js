//@flow
import React, {Component} from 'react'
import {Tetromino} from './tetromino'
import {Block} from './block'
import {Board} from './board'
export default class Tetris extends Component {
  tetromino: {}
  board: number[][]
  blockSize:number
  constructor(props: {}) {
    super(props)
    this.tetromino = {}
    this.board = new Array(10).fill(new Array(20).fill(0))
    this.blockSize=this.props.blockSize
  }
  renderBoard = () => {
    const blockSize =this.blockSize
    return (
      this.board.map((row, rowIndex) =>
        row.map((column, columnIndex) =>{
        const top = (rowIndex*1.2) * blockSize +100
          const left = (columnIndex*1.2) * blockSize +100
          
         return <Block size={20}
                 index={{column:columnIndex, row:rowIndex}}
                 style={{backgroundColor:'red',
                         width:this.blockSize,
                         height:this.blockSize,
                         padding:0,
                         position:'absolute',
                         top:top,
                         left:left,
                         border:'1px solid black'
                }}
          />}
        )
      )
    )
  }
  render() {
    return (
      <div>
      <Board>
        {this.renderBoard() }
      </Board>
       
      </div>
    )
  }
}