import React from 'react'
import './block.css'
export const Block = (props)=>{
  const {blockSize, offset,boardColor,blockBorderColor} =props.settings
  const isBackGround = props.content===0 ? true:false
  const style={
    backgroundColor: props.backgroundColor,
    width: blockSize,
    height: blockSize,
    top: props.index.row * offset * blockSize + 100,
    left: props.index.column * offset * blockSize + 700,
    position: 'absolute',
    border: isBackGround ? null : `1px solid ${blockBorderColor}`
  }
  
  
  return(
    <div className ={props.className}
         style={Object.assign({},style, props.style)} 
         id={props.id}
         onClick={(event)=>
           props.onClick(event,props.index)}
    >
    
    </div>
  )
}