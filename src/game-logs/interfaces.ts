export type IPoint = { offsetX: number; offsetY: number };
export type ICell = { id: string; point: IPoint; blockId?: string };
export type IBoard = { nRows: number; nCols: number; cells: ICell[] };
export type IScore = number;
export type IViewUpdate = {
  updateType: 'viewUpdate';
  payload: IBoard;
  timestamp: number;
};
export type IScoreUpdate = {
  updateType: 'scoreUpdate';
  payload: IScore;
  timestamp: number;
};
export type IUpdate = IViewUpdate | IScoreUpdate;

export type IUpdateType = IUpdate['updateType'];
