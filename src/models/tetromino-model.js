import { rotateMatrix } from '../components/helpers'
type Direction = 'LEFT' | 'RIGHT' | 'DOWN' | 'UP'
type Rotation = 'LEFT' | 'RIGTH'
export default class TetrominoModel {
  constructor() {

  }
  move = (direction: Direction) => {

  }
  rotate = (rotation: Rotation) => {
    this.matrix = rotateMatrix(this.matrix, rotation)
  }
}