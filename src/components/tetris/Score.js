import React from 'react'

export const Score = (props)=>{
  const totalCell=props.settings.blockSize+2*props.settings.offset+2*props.settings.blockBorderWidth
  const { buttonsBackgroundColor, buttonsColor,blockBorderWidth, blockSize,blockOutline,offset,columns,rows} = props.settings
  const fontSize = blockSize + blockBorderWidth + blockOutline + offset
  const style={
    left: (columns +1) * totalCell,
    top:(rows/2-5) * totalCell,
    color:'white',
    position:'absolute',
    fontSize:(fontSize*1.75) | 0,
    align:'right',
  }
  const divStyle={display:'flex', width:'100%', justifyContent:'space-between'}
  return(
    <div style={style}>
      <div style={divStyle}>
        <span>POINTS:&nbsp;</span>
        <span style={{color:'gray'}}>{props.points}</span>
      </div>
      <div style={divStyle}>
        <span>LINES:&nbsp;</span>
        <span style={{color:'gray'}}>{props.lines}</span>
      </div>
      <div style={divStyle}>
        <span>LEVEL:&nbsp;</span>
        <span style={{color:'gray'}}>{props.level}</span>
      </div>
    </div>
  )
}