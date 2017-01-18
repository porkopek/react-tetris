import React from 'react'

export const Tetromino = (props)=>{
  const getTetromino = (index)=>{
    const tetrominoesArray = [
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
    return tetrominoesArray[index]
  }
  return(
    <div></div>
  )
}