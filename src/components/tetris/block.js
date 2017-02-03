import React from 'react'
import './block.css'
export const Block = (props)=>{
  const {blockBorderRadius,blockSize, offset,boardColor,blockBorderColor, blockBorderWidth} =props.settings
  const isBackGround = props.content===0 ? true:false
  const style={
    backgroundColor: props.backgroundColor,
    width: blockSize,
    height: blockSize,
    border: isBackGround               
              ? `${blockBorderWidth}px solid ${props.backgroundColor}`
              : `${blockBorderWidth}px solid ${blockBorderColor}`,
    float:'left',
    margin:`${offset}px`,
    borderRadius:blockBorderRadius,
    transition:'width .4s',
    
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