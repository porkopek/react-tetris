import { rotateMatrix } from '../components/tetris/helpers'
type Direction = 'LEFT' | 'RIGHT' | 'DOWN' | 'UP'
type Rotation = 'LEFT' | 'RIGTH'
export default class TetrominoModel {
  constructor(column,row,  index) {
    this.matrix = TetrominoModel.getTetrominoesArray()[index]
    this.row=row
    this.column=column
    this.name=name
    this.move= this.move.bind(this)
    
  }
  static  getTetrominoesArray(){
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
  get abosoluteMatrix(){
    
  }
  move (direction: Direction){
    switch (direction){
     
      case 'DOWN':
        this.row = this.row+1
      break
    }
  }
  rotate = (rotation: Rotation) => {
    const firstMatrix = this.matrix
    const newMatrix = rotateMatrix(this.matrix, rotation)
    return newMatrix
  }
}