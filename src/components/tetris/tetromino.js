//@flow
import React from 'react'
import { Block } from './block'
import { settings} from './settings'
import './tetromino.css'

type Props = {
  settings: typeof settings,
  column: number,
  row: number,
  index: number,
  matrix: number[][],
  angle:number,
}

export const Tetromino = (props: Props) => {
  const totalCell=props.settings.blockSize+2*props.settings.offset+2*props.settings.blockBorderWidth
  const style ={
    width: props.matrix.length* totalCell,
    height: props.matrix.length* totalCell,
    transform:`translate(${props.column*totalCell}px, 
                         ${props.row*totalCell}px)
               rotate(${props.angle}deg)`,
    position:'absolute',
    transition: (props.animation)
                  ?'transform .2s'
                  : null,
  }
 
  return (
    <div style={style}>
      {props.matrix.map((row, rowIndex)=>row.map((column, columnIndex)=>{
        const content = props.matrix[rowIndex][columnIndex]
          return <Block
                      key={"key" + columnIndex + rowIndex}
                      content={content}
                      settings={props.settings}
                      backgroundColor={content !== 0 
                        ? props.settings.tetrominoesColors[content - 1]
                        : 'transparent'
                      }
                      isTetromino={true}
                  />
        }))
      }
    
    </div>
  )

}