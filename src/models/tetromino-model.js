import { rotateMatrix } from '../components/tetris/helpers'
import { settings } from '../components/tetris/settings'
type Direction = 'LEFT' | 'RIGHT' | 'DOWN' | 'UP'
type Rotation = 'LEFT' | 'RIGTH'
export default class TetrominoModel {
  constructor(column, row, index) {
    this.matrix = TetrominoModel.getTetrominoesArray()[index]
    this.row = row
    this.column = column
    this.name = name
  }
  static getTetrominoesArray() {
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
  static getNumberOfTetrominoes(): number {
    //there are 6 tetrominoes
    return this.getTetrominoesArray().length
  }
  
  move(direction: Direction) {
    switch (direction) {

      case 'DOWN':
        this.row = this.row + 1
        break
    }
  }
  rotate = (rotation: Rotation) => {
    const firstMatrix = this.matrix
    const newMatrix = rotateMatrix(this.matrix, rotation)
    return newMatrix
  }
 collidesWith (board: [][]): boolean  {

    for (let row = 0; row < this.matrix.length; row++) {
      for (let column = 0; column < this.matrix.length; column++) {
        if (this.matrix[row][column] !== 0) {
          //board boundaries
          if (row + this.row >= settings.rows
            || row + this.row <= 0
            || column + this.column >= settings.columns
            || column + this.column < 0) {
              return true
          }
          //board is occuppied
          if (board[row + this.row][column + this.column] !== 0) {
            return true
          }
        }
      }
    }
    return false
  }
}