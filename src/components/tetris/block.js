import React from 'react'
import './block.css'
export const Block = (props)=>{
  const {blockSize, offset,boardColor,tetrominoesColors} =props.settings
  const isBackGround = props.content===0 ? true:false
  const style={
    backgroundColor: isBackGround 
                     ? boardColor 
                     : tetrominoesColors[props.content-1],
    width: blockSize,
    height: blockSize,
    top: props.index.row * offset * blockSize + 100,
    left: props.index.column * offset * blockSize + 700,
    position: 'absolute',
    border: isBackGround ? null : '1px solid white',
  }
  
  
  return(
    <div className ={props.className}
         style={style} 
         id={props.id}
         onClick={(event)=>
           props.onClick(event,props.index)}
    >
    
    </div>
  )
}