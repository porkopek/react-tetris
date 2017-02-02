import React from 'react'
import './block.css'
export const Block = (props)=>{
  const {backgroundColor,blockSize, offset,boardColor,blockBorderColor, blockBorderWidth} =props.settings
  const isBackGround = props.content===0 ? true:false
  const style={
    backgroundColor: boardColor,
    width: blockSize,
    height: blockSize,
    border: isBackGround ? null : `${blockBorderWidth}px solid ${blockBorderColor}`,
    float:'left',
    margin:`0 0 ${offset}px ${offset}px`,
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