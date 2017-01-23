//@flow
import React, { Component } from 'react'
import { Tetromino } from './tetromino-component'
import { Block } from './block'
import { settings } from './settings'
import { createMatrix, rotateMatrix } from './helpers'
import TetrominoModel from '../../models/tetromino-model'
type Props = {
  settings: typeof settings
}
export default class Tetris extends Component {
  board: number[][]
  settings: typeof settings
  tetrominoesColors: string[]
  state: {
    board: number[][],
    tetromino: TetrominoModel
  }
  constructor(props: Props) {
    super(props)
    this.settings = Object.assign({}, settings, props.settings)
    this.tetrominoesColors = this.settings.tetrominoesColors
    this.handleKeyboard()
    this.state = {
      board: this.initializeBoard(),
      tetromino: this.getNewTetromino()
    }

  }
  initializeBoard = () => {
    return createMatrix(this.settings.columns, this.settings.rows)
  }
  getNewTetromino = (): TetrominoModel => {
    const index = Math.random() * TetrominoModel.getNumberOfTetrominoes() | 0
    return new TetrominoModel(0, 1, 5, 'state')


  }
  handleClick = (event: Event, index: { column: number, row: number }) => {
    const newBoard = this.state.board.slice()
    const content = newBoard[index.column][index.row]!==0 ? 0 : 2
    newBoard[index.column][index.row] = content
    this.setState(
      {
        board: newBoard
      })

  }
  renderBoard = () => {
    return (
      this.state.board.map((column, columnIndex) =>
        column.map((row, rowIndex) => {
          const content = this.state.board[columnIndex][rowIndex]
          return <Block
            backgroundColor={content !== 0 ?
              this.tetrominoesColors[content - 1] :
              this.settings.boardColor
            }
            settings={this.settings}
            key={rowIndex + ' ' + columnIndex}
            index={{ column: columnIndex, row: rowIndex }}
            content={content}
            id={"id" + rowIndex + columnIndex}
            onClick={this.handleClick}
            />
        })
      )
    )
  }
  handleKeyboard = () => {
    window.addEventListener('keyup', e => {
      const key = settings.keys
      const newTetromino = Object.assign({}, this.state.tetromino)
      newTetromino.name = 'newTetromino'
      switch (e.keyCode) {
        case key.left:
          console.log('esquerda')
          newTetromino.column--
          this.hasCollided(newTetromino, this.state.board) 
            ? newTetromino.column++
            : null
        break
        case key.right:
          console.log('right')
          newTetromino.column++
          this.hasCollided(newTetromino, this.state.board) 
            ? newTetromino.column--
            : null
          break
        case key.down:
          newTetromino.row++
          this.hasCollided(newTetromino, this.state.board) 
            ? newTetromino.row--
            : null
          break
        case key.rotate:
          console.log('rotate')
          newTetromino.matrix = rotateMatrix(newTetromino.matrix, 'RIGHT')
          this.hasCollided(newTetromino, this.state.board) 
            ? newTetromino.matrix = rotateMatrix(newTetromino.matrix, 'LEFT')
            : null
          break
      }
      this.setState({
        tetromino: newTetromino
      })
    })
  }
  hasCollided(tetromino: TetrominoModel, board: [][]):boolean {
   for (let c = 0; c < tetromino.matrix.length; c++) {
    for (let r = 0; r < tetromino.matrix.length; r++) {
      if (tetromino.matrix[c][r] !== 0) {
        //board boundaries
        if (c + tetromino.column >= settings.columns
          || r + tetromino.row >= settings.rows
          || c + tetromino.column < 0) {
          return true
        }else{
          console.log('')
        }
        //board is occuppied
        if (board[c + tetromino.column][r + tetromino.row] !== 0) {
          return true
        }
      }
    }
  }
  return false
  }
  render() {
    return (
      <div>
        {this.renderBoard()}
        <Tetromino
          {...this.state.tetromino}
          settings={this.settings}

          />
      </div>
    )
  }
}