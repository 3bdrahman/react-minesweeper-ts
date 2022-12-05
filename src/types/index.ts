export enum CellVal{
    none,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    bomb
}
export enum CellState{
     clickable,
     clicked,
     flagged
}
export type Cell = {value: CellVal; state: CellState};
export enum Emoji{
    smile='🙂',
    scard = '😨',
    loss= '🥸',
    win= '😎'

}