//@flow
import React, { Component } from 'react'
import { Block } from './block'
import { rotateMatrix } from './helpers'
import  './tetromino.css'
type Props ={
    settings:{},
    column:number,
    row:number,
    index:number
  }
type State ={
  className:string,
  matrix:number[][]
}
export default class Tetromino  extends Component{
  column:number
  row:number
  matrix:number[][]
  tetrominoesArray:number[][][]
  settings:{}
  state:State
  
  constructor (props:Props){
    super (props)
    this.settings=props.settings
    this.tetrominoesArray=  Tetromino.getTetrominoesArray()
    this.state={
      className:'move',
      matrix:this.tetrominoesArray[props.index],
      column: props.column,
      row: props.row

    }
  }
  static getTetrominoesArray(){
    return [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0],
        [0, 2, 2],
        [2, 2, 0],
      ],
      [
        [0, 0, 0],
        [3, 3, 0],
        [0, 3, 3],
      ],
      [
        [4, 4],
        [4, 4],
      ],
      [
        [0, 0, 0],
        [5, 5, 5],
        [0, 5, 0],
      ],
      [
        [0, 0, 0],
        [6, 0, 0],
        [6, 6, 6],
      ],
      [
        [0, 0, 0],
        [0, 0, 7],
        [7, 7, 7],
      ],

    ]
  }
  static getNumberOfTetrominoes():number{
    //there are 6 tetrominoes
    return this.getTetrominoesArray().length
  }
  handleClick=(event:Event,index:number)=>{
    
    const newMatrix = rotateMatrix(this.state.matrix,'RIGHT').slice()
    console.table(newMatrix)
    this.setState({
      matrix:newMatrix
    })
  }
  move=(direction:string)=>{
    switch (direction){
      case 'DOWN':
        this.row++
      break      
      case 'LEFT':
        this.column--
      break
      case 'RIGHT':
        this.column++
      break
    }

  }
  rotate=(direction:string)=>{
    const newMatrix = rotateMatrix(this.state.matrix, direction).slice()
    this.setState({matrix:newMatrix})
  }
  render=()=>{
    
    return (
      <div>
        {this.state.matrix.map((column, columnIndex) =>
        column.map((row, rowIndex) => {
          const content=this.state.matrix[columnIndex][rowIndex]
          console.log(content)
          return <Block
                    className={content!==0 ?this.state.className : 'transparent-block'}
                    settings={this.settings}
                    key={rowIndex + ' ' + columnIndex}
                    index={{ column: columnIndex, row:rowIndex  }}
                    content={content}
                    id={"id"+rowIndex + columnIndex}
                    row={this.props.row + rowIndex}
                    column={this.props.column + columnIndex}
                    onClick={ this.handleClick}
          >
         row:{this.state.row + rowIndex}
         <br/>
         column:{this.state.column + columnIndex}
          </Block>
        })
      )}
      </div>
    )
  }
}