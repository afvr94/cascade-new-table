import { Reducer } from 'react';
import produce, { Draft } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { Action, State } from './types';
import { rowData, columnData } from './data';
import { getColumnWidth } from './utils';
import {
  ActionConstant,
  CursorMovement,
  InsertColumnPlacement,
  InsertRowPlacement,
} from './constants';

export const initialState: State = {
  rowData,
  columnData,
  // starting at -1 since you can't reach it, it gets assign when user clicks a cell
  position: { x: -1, y: -1 },
};

const reducer: Reducer<State, Action> = produce((draft: Draft<State>, action: Action) => {
  switch (action.type) {
    case ActionConstant.INSERT_NEW_ROW_TO_THE_END: {
      const { rowData: oldRows } = draft;
      const newRow: { [key: string]: string } = {};
      draft.columnData.forEach((column) => {
        newRow[column.accessor] = '';
      });
      draft.rowData = [...oldRows, { ...newRow, id: uuidv4() }];
      break;
    }

    case ActionConstant.INSERT_NEW_COLUMN_TO_THE_END: {
      const { columnData: oldColumns, rowData: oldRows } = draft;
      const newColumnId = `data${uuidv4()}`;
      draft.columnData = [
        ...draft.columnData,
        {
          Header: `Label ${oldColumns.length + 1}`,
          accessor: newColumnId,
          index: oldColumns.length,
          width: 200,
        },
      ];
      // Adding new label accessor created above to existing rows
      draft.rowData = oldRows.map((row) => {
        return { ...row, [newColumnId]: '' };
      });
      break;
    }

    case ActionConstant.SET_CELL_NEW_VALUE: {
      const { rowData: oldRows } = draft;
      const { rowIndex, columnId, value } = action;
      draft.rowData = oldRows.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...oldRows[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      });

      break;
    }

    case ActionConstant.RESIZE_COLUMN: {
      const { columnId, value } = action;
      const columnIndex = draft.columnData.findIndex((column) => column.accessor === columnId);
      draft.columnData[columnIndex].width = getColumnWidth(
        draft.rowData,
        draft.columnData[columnIndex].accessor,
        value
      );
      break;
    }

    case ActionConstant.SET_CURSOR_POSITION: {
      const { x, y } = action;
      draft.position = { x, y };
      break;
    }

    case ActionConstant.MOVE_CURSOR_POSITION: {
      const { position: oldPosition, columnData: columns, rowData: rows } = draft;
      const { key } = action;
      const validKeys: string[] = Object.values(CursorMovement);
      if (!validKeys.includes(key)) return;
      if (key === CursorMovement.RIGHT) {
        if (oldPosition.x === columns.length - 1) return;
        draft.position = { ...oldPosition, x: oldPosition.x + 1 };
        return;
      }
      if (key === CursorMovement.LEFT) {
        if (oldPosition.x === 0) return;
        draft.position = { ...oldPosition, x: oldPosition.x - 1 };
        return;
      }
      if (key === CursorMovement.UP) {
        if (oldPosition.y === 0) return;
        // since our reference point (0, 0) is in the top
        // we need to lower y position if we can
        draft.position = { ...oldPosition, y: oldPosition.y - 1 };
        return;
      }
      if (key === CursorMovement.DOWN) {
        if (oldPosition.y === rows.length - 1) return;
        // since our reference point (0, 0) is in the top
        // we need to increase y position if we can
        draft.position = { ...oldPosition, y: oldPosition.y + 1 };
      }
      break;
    }

    case ActionConstant.INSERT_ROW_ABOVE_OR_BELOW: {
      const { rowIndex, placement } = action;
      const newRow: { [key: string]: string } = {};
      draft.columnData.forEach((column) => {
        newRow[column.accessor] = '';
      });

      if (placement === InsertRowPlacement.BELOW) {
        draft.rowData.splice(rowIndex + 1, 0, { ...newRow, id: uuidv4() });
        return;
      }
      draft.rowData.splice(rowIndex, 0, { ...newRow, id: uuidv4() });
      break;
    }

    case ActionConstant.INSERT_COLUMN_LEFT_OR_RIGHT: {
      const { columnData: oldColumns, rowData: oldRows } = draft;
      const { columnIndex, placement } = action;
      // Go through columns and update header if needed
      draft.columnData = oldColumns.map((column, index) => {
        // if placement is left than every index to the left of clicked included clicked
        // will change header and index
        if (index >= columnIndex && placement === InsertColumnPlacement.LEFT) {
          return {
            ...column,
            // We are adding 2 here because index start in 1 and also we need to increase it
            Header: `Label ${index + 2}`,
            index: columnIndex + 1,
          };
        }
        // if placement is right than every index to the left of clicked will change header and index
        if (index > columnIndex && placement === InsertColumnPlacement.RIGHT) {
          // We are adding 2 here because index start in 1 and also we need to increase it
          return {
            ...column,
            Header: `Label ${index + 2}`,
            index: columnIndex + 2,
          };
        }
        return column;
      });
      const newColumnId = `data${uuidv4()}`;
      if (placement === InsertColumnPlacement.LEFT) {
        draft.columnData.splice(columnIndex, 0, {
          Header: `Label ${columnIndex + 1}`,
          accessor: newColumnId,
          index: columnIndex,
          width: 200,
        });
      } else {
        const columnNewPosition = columnIndex + 1;
        draft.columnData.splice(columnNewPosition, 0, {
          Header: `Label ${columnIndex + 2}`,
          accessor: newColumnId,
          index: columnIndex + 1,
          width: 200,
        });
      }

      draft.rowData = oldRows.map((row) => ({ ...row, [newColumnId]: '' }));
      break;
    }

    case ActionConstant.REMOVE_ROW: {
      const { rowIndex } = action;
      draft.rowData.splice(rowIndex, 1);
      break;
    }

    case ActionConstant.REMOVE_COLUMN: {
      const { columnData: oldColumns, rowData: oldRows } = draft;
      const { columnIndex } = action;
      const columnId = draft.columnData[columnIndex].accessor;
      // Go through columns and update header if needed
      draft.columnData = oldColumns.map((column, index) => {
        // if index is greater than the columnIndex clicked that we need to lower label and index number
        if (index > columnIndex) {
          return {
            ...column,
            Header: `Label ${index}`,
            index: index - 1,
          };
        }
        return column;
      });
      draft.columnData.splice(columnIndex, 1);
      draft.rowData = oldRows.map((row) => {
        const newRow = { ...row };
        delete newRow[columnId];
        return newRow;
      });
      break;
    }
    default:
      throw new Error('Invalid action :(');
  }
}, initialState);

export default reducer;
