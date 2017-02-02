import React from 'react'
import { settings } from './settings'
import {Block} from './block'
type Props={
  matrix:number[][]
}
export const Board =(props:Props)=>{
  
  const style ={
    width: props.settings.columns*(props.settings.blockSize+(2*props.settings.blockBorderWidth)+ props.settings.offset ),
    height:props.settings.rows * (props.settings.blockSize+(2*props.settings.blockBorderWidth)+ props.settings.offset),
    backgroundColor:props.settings.boardColor,
    paddingRight:props.settings.offset,
    paddingTop:props.settings.offset,
    
  }
  return(
    <div style={style}>
      {props.matrix.map((row, rowIndex)=>row.map((column, columnIndex)=>{
        const content = props.matrix[rowIndex][columnIndex]
          return <Block
                      key={"key" + columnIndex + rowIndex}
                      {...props}
                  />
        }))
      }
    
    </div>
  )
}