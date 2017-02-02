//@flow
import React, { Component } from 'react'
import { Block } from './block'
import { rotateMatrix } from './helpers'
import './tetromino.css'

type Props = {
  settings: { tetrominoesColors: string[] },
  column: number,
  row: number,
  index: number,
  matrix: number[][],
  className: string
}

export const Tetromino = (props: Props) => {
  const {tetrominoesColors} = props.settings
  return (
    <div>    
    
    </div>
  )

}