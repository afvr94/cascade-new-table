import { ActionConstant, InsertRowPlacement, InsertColumnPlacement } from './constants';

export type EditableCellProps = {
  value: string;
  row: { index: number };
  column: { id: string; index: number; width: number };
};

export type RowDataType = {
  [key: string]: string;
  id: string;
};

export type RowType = {
  index: number;
};

export type ColumnType = {
  Header: string;
  accessor: string;
  index: number;
  width: number;
};

type SetNewRowAction = {
  type: ActionConstant.INSERT_NEW_ROW_TO_THE_END;
};

type SetNewColumnAction = {
  type: ActionConstant.INSERT_NEW_COLUMN_TO_THE_END;
};

type SetCellNewValue = {
  type: ActionConstant.SET_CELL_NEW_VALUE;
  rowIndex: number;
  columnId: string;
  value: string;
};

type SetCursorPosition = {
  type: ActionConstant.SET_CURSOR_POSITION;
  x: number;
  y: number;
};

type MoveCursoPosition = {
  type: ActionConstant.MOVE_CURSOR_POSITION;
  key: string;
};

type InsertRow = {
  type: ActionConstant.INSERT_ROW_ABOVE_OR_BELOW;
  placement: InsertRowPlacement;
  rowIndex: number;
};

type RemoveRow = {
  type: ActionConstant.REMOVE_ROW;
  rowIndex: number;
};

type InsertColumn = {
  type: ActionConstant.INSERT_COLUMN_LEFT_OR_RIGHT;
  placement: InsertColumnPlacement;
  columnIndex: number;
};

type RemoveColumn = {
  type: ActionConstant.REMOVE_COLUMN;
  columnIndex: number;
};

type ResizeColumn = {
  type: ActionConstant.RESIZE_COLUMN;
  columnId: string;
  value: string;
};

export type Action =
  | SetNewRowAction
  | SetNewColumnAction
  | SetCellNewValue
  | SetCursorPosition
  | MoveCursoPosition
  | InsertRow
  | InsertColumn
  | RemoveRow
  | RemoveColumn
  | ResizeColumn;

export type State = {
  readonly rowData: RowDataType[];
  readonly columnData: ColumnType[];
  readonly position: { x: number; y: number };
};
