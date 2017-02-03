//@flow
import React, { Component } from 'react'
import { Tetromino } from './tetromino-component'
import { Board } from './board'
import { Block } from './block'
import { settings } from './settings'
import { createMatrix, rotateMatrix } from './helpers'
import TetrominoModel from '../../models/tetromino-model'
type Props = {
  settings: typeof settings
}
type State = {
  boardMatrix: number[][],
  tetrominoesArray:number[],
  tetromino: TetrominoModel,
  intervalId: number,
  intervalTime: number,
  paused: boolean,
  points:number,
  completedLines:number,
  level:number,
  rotationAngle:number,
  tetrominoMatrix:number[][],
  animation:boolean,
}
export default class Tetris extends Component {
  boardMatrix: number[][]
  settings: typeof settings
  tetrominoesColors: string[]
  state: State
  constructor(props: Props) {
    super(props)
    this.settings = Object.assign({}, settings, props.settings)
    this.handleKeyboard()
    const tetromino = new TetrominoModel(3, 0, Math.random()*7|0) 
    this.state = {
      boardMatrix: this.initializeBoard(),
      tetrominoesArray:this.initializeTetrominoesArray(),
      tetromino:tetromino,
      tetrominoMatrix:tetromino.matrix,
      intervalId: 0,
      intervalTime: this.settings.intervalTimeInMiliSeconds,
      paused: false,
      points: 0,
      completedLines:0,
      level:1,
      rotationAngle:0,
      animation:this.settings.animation
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
        const columnIndex = (this.state.boardMatrix[0].length / 2 - matrix.length / 2) | 0
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
    const tetrominoMatrix=newTetromino.matrix
    tetrominoesArray.push(Math.random()*TetrominoModel.getNumberOfTetrominoes()|0)   
    this.setState({tetrominoesArray, tetrominoMatrix, rotationAngle:0})
    
    return newTetromino
  }
  getFreeBottomRow = ():number=>{
    const tetromino:TetrominoModel = Object.assign(new TetrominoModel(), this.state.tetromino)
    const initialRow=tetromino.row
    tetromino.row++
    while(!tetromino.collidesWith(this.state.boardMatrix)){
      tetromino.row++
    }
    const result = tetromino.row - initialRow-1
    return result
  }
  moveTetromino = (direction: 'DOWN' | 'LEFT' | 'RIGHT' | 'BOTTOM'): void => {
    let tetromino = Object.assign(new TetrominoModel(), this.state.tetromino)
    tetromino.collidesWith.bind(tetromino)
    let rowAdvance = 0, columnAdvance = 0
    let mustUpdate = true
    
    const {boardMatrix} = this.state
    switch (direction) {
      case 'DOWN':
        rowAdvance++
        break
      case 'LEFT':
        columnAdvance--
        break
      case 'RIGHT':
        columnAdvance++
        break
      case 'BOTTOM':
        rowAdvance+=this.getFreeBottomRow()
    }
    tetromino.row += rowAdvance
    tetromino.column += columnAdvance
    //If collided, move back
    if (tetromino.collidesWith(boardMatrix)) {
      
      tetromino.row -= rowAdvance
      tetromino.column -= columnAdvance
      mustUpdate = false
    }
    //restores animation
    if (mustUpdate) {
      this.setState({ tetromino, animation:true })
    }

  }
  
  rotateTetromino = () => {
    let tetromino = Object.assign(new TetrominoModel(), this.state.tetromino)
    let rotationAngle = this.state.rotationAngle
    tetromino.matrix = rotateMatrix(tetromino.matrix, 'RIGHT')
    rotationAngle+=90
    if (tetromino.collidesWith(this.state.boardMatrix)) {
      if (tetromino.row < 0) {
        tetromino.row = 0
      } else if (tetromino.column < 0) {
        tetromino.column = 0
      } else if (tetromino.column + tetromino.matrix.length > this.settings.columns) {
        const tempColum = tetromino.column
        tetromino.column = this.settings.columns - tetromino.matrix.length
        if (tetromino.collidesWith(this.state.boardMatrix)) {
          tetromino.column = tempColum
          tetromino.matrix = rotateMatrix(tetromino.matrix, 'LEFT')
          rotationAngle-=90
        }
      } else {
        tetromino.matrix = rotateMatrix(tetromino.matrix, 'LEFT')
        rotationAngle-=90
      }
    }
    //restores animation
    this.setState({ tetromino, rotationAngle, animation:true })
  }
  handleClick = (event: Event, index: { column: number, row: number }) => {
    const newBoard = this.state.boardMatrix.slice()
    const content = newBoard[index.row][index.column] !== 0 
                      ? [0,0,0,0,0,0,0,0,0,0] 
                      : [0,0,0,0,0,2,2,2,0,0]
    newBoard[index.row] = content
    this.setState(
      {
        boardMatrix: newBoard
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
          this.moveTetromino('LEFT')
          break
        case key.right:
           this.moveTetromino('RIGHT')
          break
        case key.down:
          this.moveTetromino('DOWN')
          break
        case key.rotate:
         this.rotateTetromino('RIGHT')
          break
        case key.pause:
          this.setState((prevState) => ({ paused: prevState.paused ? false : true }))
          return          
        case key.bottom:
           this.moveTetromino('BOTTOM')
        break
      }
    })
  }
 
  completedLines = ():number[] => {
    const linesArray = []
    this.state.boardMatrix.forEach((row, rowIndex) =>
      (row.some(column =>
        column === 0)
        ? null //some elements are 0, so it's not empty
        : linesArray.push(rowIndex) //none element is 0, so it's full
      ))
    return linesArray
  }
  clearCompletedLines = (completedLines:number[]) => {
    const newBoard = this.state.boardMatrix.slice()   
    for (let completedLine of completedLines) {
      newBoard.splice(completedLine, 1)
      newBoard.unshift(new Array(this.settings.columns).fill(0))
    }
    this.setState({
      boardMatrix: newBoard
    })
  }
  gameOver=()=>{
    
    const boardMatrix =this.initializeBoard()    
    this.setState({boardMatrix})
    
  }
  insertTetrominoInBoard = () => {
    const boardMatrix = this.state.boardMatrix.slice()
    const {tetromino} = this.state
    tetromino.matrix.map((row, rowIndex) =>
      row.map((column, columnIndex) => {
        if (tetromino.matrix[rowIndex][columnIndex] !== 0) {
          try {
             boardMatrix[rowIndex + tetromino.row][columnIndex + tetromino.column] = tetromino.matrix[rowIndex][columnIndex]
          } catch (error) {
           
          }         
        }
      }
      ))
    this.setState({boardMatrix, animation:false})

  }
  updatePoints = (completedLines: number) => {
    let {points} = this.state
    let extraPoints = 0
    for (let i = 0; i < completedLines; i++) {
      extraPoints += (i * 200)
    }
    points += extraPoints + this.settings.pointsPerLine * completedLines
    this.setState((prevState:State)=>({ points, completedLines:prevState.completedLines+completedLines }))
  }
  renderBoard = () => {
    return (
      this.state.boardMatrix.map((row, rowIndex) =>
        row.map((column, columnIndex) => {
          const content = this.state.boardMatrix[rowIndex][columnIndex]
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
    let tetromino = Object.assign(new TetrominoModel(), this.state.tetromino)
    const newBoard = this.state.boardMatrix.slice()
    if (!this.state.paused){
      tetromino.row++
    }
    if (tetromino.collidesWith(this.state.boardMatrix)) {
      tetromino = this.getNewTetromino()
      this.insertTetrominoInBoard()
      const completedLinesArray = this.completedLines()
      if (completedLinesArray.length>0) {
        this.clearCompletedLines(completedLinesArray)
        this.updatePoints(completedLinesArray.length)
      }else{
        if (this.state.boardMatrix[1].some(x=>x!=0)){
          this.gameOver()
        }
      }
      this.changeInterval()
    }

    const intervalId = setTimeout(() => this.mainLoop(), this.state.intervalTime)
    this.setState({ tetromino, intervalId })
  }
  renderScore = () => {
    return (
      <div>
        <div>{this.state.intervalTime}</div>
        <div>PAUSED: {this.state.paused ? ' true' : ' false'}</div>
        <div>POINTS: {this.state.points}</div>
        <div>LINES: {this.state.completedLines}</div>
        <div>X: {this.state.tetromino.column}, Y: {this.state.tetromino.row}</div>
      </div>
    )
  }
  render() {
    const style={
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        zIndex:0,
        height:'100vh',
      }
    return (
      <div style={style}>
        
        
        <Board settings={this.settings} matrix={this.state.boardMatrix}>
          <Tetromino
            {...this.state.tetromino}
            matrix ={this.state.tetrominoMatrix}
            index={this.state.tetrominoesArray[0]}
            settings={this.settings}
            className=''
            angle={this.state.rotationAngle}
            animation={this.settings.animation}

          />
        </Board>
        <Tetromino
            {...this.state.tetromino}
            matrix ={TetrominoModel.getTetrominoesArray()[this.state.tetrominoesArray[0]]}
            row={5}
            column={8}
            index={this.state.tetrominoesArray[0]}
            settings={this.settings}
            className=''
            angle={this.state.rotationAngle}
            animation={false}

          />
      </div>
    )
  }
}
