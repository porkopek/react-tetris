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
type State = {
  board: number[][],
  tetrominoesArray:number[],
  tetromino: TetrominoModel,
  intervalId: number,
  intervalTime: number,
  paused: boolean,
  points:number,
  linesCleared:number,
  level:number
}
export default class Tetris extends Component {
  board: number[][]
  settings: typeof settings
  tetrominoesColors: string[]
  state: State
  constructor(props: Props) {
    super(props)
    this.settings = Object.assign({}, settings, props.settings)
    this.handleKeyboard()

    this.state = {
      board: this.initializeBoard(),
      tetrominoesArray:this.initializeTetrominoesArray(),
      tetromino:new TetrominoModel(3, -1, Math.random()*7|0) ,
      intervalId: 0,
      intervalTime: this.settings.intervalTimeInMiliSeconds,
      paused: false,
      points: 0,
      linesCleared:0,
      level:1
    }

  }
  initializeBoard = () => {
    return createMatrix(this.settings.rows, this.settings.columns)
  }
  initializeTetrominoesArray =()=>{     
    const numberOfTetrominoes =TetrominoModel.getNumberOfTetrominoes()
    const tetrominoesArray= new Array(numberOfTetrominoes)
                        .fill(null)
                        .map(spot=>Math.random()*numberOfTetrominoes|0)
    
    return tetrominoesArray
                        
    

  }
  getStartPoint = (matrix: number[][]): { row: number, column: number } => {
    let finalRow=0,finalColumn=0
    for (let rowIndex=0;rowIndex<matrix.length;rowIndex++) {
      const row =matrix[rowIndex]
      if (row.some(cell => cell !== 0)) {
        const columnIndex = (this.state.board[0].length / 2 - matrix.length / 2) | 0
        finalRow=0-rowIndex
        finalColumn=columnIndex
        return {row:finalRow, column:finalColumn}
      }
    }
    return {row:0, column:0}

  }
  getNewTetromino = (): TetrominoModel => {
    const {tetrominoesArray} = this.state
    const tetrominoIndex = tetrominoesArray.shift()
    const startPoint = this.getStartPoint(TetrominoModel.getTetrominoesArray()[tetrominoIndex])
    const newTetromino = new TetrominoModel(startPoint.column, startPoint.row, tetrominoIndex)
    tetrominoesArray.push(Math.random()*TetrominoModel.getNumberOfTetrominoes()|0)
    this.setState({tetrominoesArray})
    
    return newTetromino
  }
  handleClick = (event: Event, index: { column: number, row: number }) => {
    const newBoard = this.state.board.slice()
    const content = newBoard[index.row][index.column] !== 0 
                      ? [0,0,0,0,0,0,0,0,0,0] 
                      : [2,2,2,2,2,2,2,2,2,2]
    newBoard[index.row] = content
    this.setState(
      {
        board: newBoard
      })

  }
  handleKeyboard = () => {
    window.addEventListener('keydown', e => {
      const key = settings.keys
      //if e.keyCode is not one of the keys that operates Tetromino, returns
      if (!Object.values(key).includes(e.keyCode)) return
      const newTetromino = Object.assign({}, this.state.tetromino)
      switch (e.keyCode) {
        case key.left:
          newTetromino.column--
          this.hasCollided(newTetromino, this.state.board)
            ? newTetromino.column++
            : null
          break
        case key.right:
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
          newTetromino.matrix = rotateMatrix(newTetromino.matrix, 'RIGHT')
          this.hasCollided(newTetromino, this.state.board)
            ? newTetromino.matrix = rotateMatrix(newTetromino.matrix, 'LEFT')
            : null
          break
        case key.pause:
          this.setState((prevState) => ({ paused: prevState.paused ? false : true }))

          return
          break
      }
      //Only change state if newTetromino changed
      this.setState({
        tetromino: newTetromino
      })
    })
  }
  hasCollided(tetromino: TetrominoModel, board: [][]): boolean {
    for (let row = 0; row < tetromino.matrix.length; row++) {
      for (let column = 0; column < tetromino.matrix.length; column++) {
        if (tetromino.matrix[row][column] !== 0) {
          //board boundaries
          if (row + tetromino.row >= this.settings.rows
            || column + tetromino.column >= this.settings.columns
            || column + tetromino.column < 0) {
            return true
          }
          //board is occuppied
          if (board[row + tetromino.row][column + tetromino.column] !== 0) {
            return true
          }
        }
      }
    }
    return false
  }
  completedLines = ():number[] => {
    const linesArray = []
    this.state.board.forEach((row, rowIndex) =>
      (row.some(column =>
        column === 0)
        ? null //some elements are 0, so it's not empty
        : linesArray.push(rowIndex) //none element is 0, so it's full
      ))
    return linesArray
  }
  clearCompletedLines = (completedLines:number[]) => {
    const newBoard = this.state.board.slice()   
    for (let completedLine of completedLines) {
      newBoard.splice(completedLine, 1)
      newBoard.unshift(new Array(this.settings.columns).fill(0))
    }
    this.setState({
      board: newBoard
    })
  }
  gameOver=()=>{
    
    const board =this.initializeBoard()    
    this.setState({board})
    
  }
  insertTetrominoInBoard = () => {
    const newBoard = this.state.board.slice()
    const {tetromino} = this.state
    tetromino.matrix.map((row, rowIndex) =>
      row.map((column, columnIndex) => {
        if (tetromino.matrix[rowIndex][columnIndex] !== 0) {
          newBoard[rowIndex + tetromino.row][columnIndex + tetromino.column] = tetromino.matrix[rowIndex][columnIndex]
        }
      }
      ))
    this.setState({
      board: newBoard
    })

  }
  updatePoints = (completedLines: number) => {
    let {points} = this.state
    let extraPoints = 0
    for (let i = 0; i < completedLines; i++) {
      extraPoints += (i * 200)
    }
    points += extraPoints + this.settings.pointsPerLine * completedLines
    this.setState({ points })
  }
  renderBoard = () => {
    return (
      this.state.board.map((row, rowIndex) =>
        row.map((column, columnIndex) => {
          const content = this.state.board[rowIndex][columnIndex]
          return (
            <Block
              backgroundColor={content !== 0 ?
                this.settings.tetrominoesColors[content - 1] :
                this.settings.boardColor
              }
              settings={this.settings}
              key={"key" + columnIndex + rowIndex}
              index={{ row: rowIndex, column: columnIndex }}
              content={content}
              id={"id" + columnIndex + rowIndex}
              onClick={this.handleClick}           
            />)
        })
      )
    )
  }
  componentWillMount = () => {
    this.mainLoop()
  }
  changeInterval = () => {
    const intervalDecrement = this.state.intervalTime <= 500
      ? 0
      : 100
    this.setState((prev: State) => ({ intervalTime: prev.intervalTime - intervalDecrement }))
  }
  mainLoop = () => {


    clearInterval(this.state.intervalId)
    let tetromino = Object.assign({}, this.state.tetromino)
    const newBoard = this.state.board.slice()
    if (!this.state.paused){
      tetromino.row++
    }
    if (this.hasCollided(tetromino, this.state.board)) {
      tetromino = this.getNewTetromino()
      this.insertTetrominoInBoard()
      const completedLinesArray = this.completedLines()
      if (completedLinesArray.length>0) {
        this.clearCompletedLines(completedLinesArray)
        this.updatePoints(completedLinesArray.length)
      }else{
        if (this.state.board[1].some(x=>x!=0)){
          this.gameOver()
        }
      }
      this.changeInterval()
    }

    const intervalId = setTimeout(() => this.mainLoop(), this.state.intervalTime)
    this.setState({ tetromino, intervalId })
  }
  render() {
    return (
      <div>
        <div>{this.state.intervalTime}</div>
        <div>PAUSED: {this.state.paused ? ' true' : ' false'}</div>
        <div>POINTS: {this.state.points}</div>
        <div>X: {this.state.tetromino.column}, Y: {this.state.tetromino.row}</div>
        <Tetromino
          row = {5}
          column={13}
          matrix={TetrominoModel.getTetrominoesArray()[this.state.tetrominoesArray[0]]}
          index={this.state.tetrominoesArray[0]}
          settings={this.settings}
          className=''

        />
        {this.renderBoard()}
        <Tetromino
          {...this.state.tetromino}
          settings={this.settings}

          />
      </div>
    )
  }
}
