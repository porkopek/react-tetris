//@flow
type Settings = {
  blockSize: number,
  tetrominoesColors: [],
  boardColor: string,
  rows: number,
  columns: number,
  offset: number,
  keys: {
    left: number,
    right: number,
    down: number,
    rotate: number,
    pause: number
  },
  blockBorderColor: string,
  blockBorderWidth:number,
  blockBorderRadius:number | string,
  intervalTimeInMiliSeconds: number,
  pointsPerLine:number,
  animation:boolean,
}
export const settings: Settings = {
  blockSize: 30,
  tetrominoesColors: [
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF',
  ],
  boardColor: 'white',
  rows: 20,
  columns: 10,
  offset: 1.1,
  keys: {
    left: 37,
    right: 39,
    down: 40,
    rotate: 38,
    pause : 27
  },
  blockBorderColor: 'transparent',
  blockBorderWidth:0,
  blockBorderRadius:0,
  intervalTimeInMiliSeconds: 1000,
  pointsPerLine:1000,
  animation:true,

} 