//@flow
import _ from 'lodash'


const transpose = matrix => _.unzip(matrix)
const reverse = matrix => _.cloneDeep(matrix).reverse()

type Rotation = 'LEFT' | 'RIGHT'

export const rotateMatrix = (matrix: number[][], rotation: Rotation):number [][] => {
  let transposedMatrix:number[][] = transpose(matrix)
  return rotation === 'LEFT'
    ? reverse(transposedMatrix)
    : transposedMatrix.map(r => reverse(r))
}

//creates an Array of Arrays (rows*columns) filled with value or with 0
export const createMatrix = (columns:number, rows:number, value:number=0):number[][]=>{
  let matrix =[]
  for (let row=0;row<columns;row++){
    matrix[row]=[]
    for (let column=0;column<rows;column++){
      matrix[row][column]=value
    }
  }
  return matrix
}
