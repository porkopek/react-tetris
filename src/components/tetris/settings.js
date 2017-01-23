//@flow
type Settings ={
  blockSize:number,
  tetrominoesColors:[],
  boardColor:string,
  rows:number,
  columns:number,
  offset:number
}
export const settings:Settings ={
  blockSize:30,
  tetrominoesColors:[
      '#FF0D72',
      '#0DC2FF',
      '#0DFF72',
      '#F538FF',
      '#FF8E0D',
      '#FFE138',
      '#3877FF',
    ],
    boardColor:'white',
    rows:20,
    columns:10,
    offset:1.1
} 