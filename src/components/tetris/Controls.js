import React from 'react'

export const Controls = (props)=>{
  const { buttonsBackgroundColor, buttonsColor,blockBorderWidth,
          blockSize,blockOutline,offset} 
        = props.settings
  const fontSize = blockSize + blockBorderWidth + blockOutline + offset
  const button ={ margin:'5px 0px', border:'none', width:'23%', 
                  backgroundColor:buttonsBackgroundColor, color:buttonsColor, 
                  borderRadius:'4px', padding:'5px 10px',fontSize:fontSize,
                  cursor:'pointer'

                }
    return(
      <div style={{display:'flex',justifyContent:'space-between', width:props.width}}>
        <button style={button} onMouseDown={props.moveLeft}>←</button>
        <button style={button} onMouseDown={props.rotate}>↻</button>
        <button style={button} onMouseDown={props.moveDown}>↓</button>
        <button style={button} onMouseClick={props.moveRight}>→</button>
         
      </div>


    )

  
}