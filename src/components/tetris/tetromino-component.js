//@flow
import React, { Component } from 'react'
import { Block } from './block'
import { rotateMatrix } from './helpers'
 
import  './tetromino.css'
type Props ={
    settings:{tetrominoesColors:string[]},
    column:number,
    row:number,
    index:number,
    matrix:number[][],
    className:string
  }

export const Tetromino =(props:Props)=>{
    const {tetrominoesColors} =props.settings
    return (
      <div>
        {props.matrix.map((column, columnIndex) =>
        column.map((row, rowIndex) => {
          const content=props.matrix[columnIndex][rowIndex]
          return <Block
                    backgroundColor={content!==0? tetrominoesColors[content-1]:'transparent'}
                    className={content!==0 ?props.className : 'transparent-block'}
                    settings={props.settings}
                    key={rowIndex + ' ' + columnIndex}
                    index={{ column: props.column + columnIndex, row:props.row + rowIndex  }}
                    content={content}
                    id={"id"+rowIndex + columnIndex}
                    row={props.row + rowIndex}
                    column={props.column + columnIndex}
                   
          />
        })
      )}
      </div>
    )
 
}