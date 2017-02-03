import React from 'react'
import './block.css'
export const Block = (props)=>{
  const {blockBorderRadius,blockSize, offset,boardColor,blockBorderColor, 
         blockBorderWidth,tetrominoesBorderColors, blockOutline} =props.settings
  const isBackGround = props.content===0 ? true:false
  const style={
    backgroundColor: props.backgroundColor,
    width: blockSize,
    height: blockSize,
    border: isBackGround               
              ? `${blockBorderWidth}px solid ${props.backgroundColor}`
              : `${blockBorderWidth}px solid ${tetrominoesBorderColors[props.content-1]}`,
    float:'left',
    margin:`${offset}px`,
    borderRadius:blockBorderRadius,
    boxShadow: !isBackGround               
              ?`0 0 0 ${blockOutline}pt ${props.backgroundColor}`
              : null
  }
  
  
  return(
    <div className ={props.className}
         style={Object.assign({},style, props.style)} 
         id={props.id}         
    >
    
    </div>
  )
}