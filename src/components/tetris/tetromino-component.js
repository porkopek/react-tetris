//@flow
import React, { Component } from 'react'
import { Block } from './block'
import { rotateMatrix } from './helpers'
import './tetromino.css'

type Props = {
  settings: { tetrominoesColors: string[] },
  column: number,
  row: number,
  index: number,
  matrix: number[][],
  className: string
}

export const Tetromino = (props: Props) => {
  const {tetrominoesColors} = props.settings
  return (
    <div>    
      {props.matrix.map((row, rowIndex) =>
        row.map((column, columnIndex) => {
          const content = props.matrix[rowIndex][columnIndex]
          return (
            <Block
              backgroundColor={content !== 0 ? tetrominoesColors[content - 1] : 'rgba(0,0,0,.1)'}
              className={content !== 0 ? props.className : 'transparent-block'}
              settings={props.settings}
              key={columnIndex + ' ' + rowIndex}
              index={{ column: props.column + columnIndex, row: props.row + rowIndex }}
              content={content}
              id={"id" + columnIndex + rowIndex}
              row={props.row + rowIndex}
              column={props.column + columnIndex}
              style={{zIndex:content !== 0 ?1000 : 1000}}
            />)
        })
      )}
    </div>
  )

}