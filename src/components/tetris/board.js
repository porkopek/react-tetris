import React from 'react'

export const Board =(props)=>{
  return(
    <div style={{position:'relative'}}>
    {props.children}
    </div>
  )
}