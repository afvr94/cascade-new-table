import React, { ChangeEvent, useRef, KeyboardEvent, useEffect } from 'react';
import styled from 'styled-components';
import { Menu, MenuItem } from '@blueprintjs/core';
import { ContextMenu2 } from '@blueprintjs/popover2';
import { EditableCellProps } from '../types';
import { useContext } from '../context';
import { ActionConstant, InsertColumnPlacement, InsertRowPlacement } from '../constants';

const Input = styled.input<{ width: number }>`
  margin: 0;
  border: 0;
  background: transparent;
  padding: 1rem;
  &:focus {
    border: 0px solid #63b1ec;
    background: #e9f2f8;
  }
  width: ${(props) => `${props.width}px`};
`;

const EditableCell: React.FC<EditableCellProps> = ({
  value: initialValue,
  row: { index: rowIndex },
  column: { index: columnIndex, id: columnId, width },
}: EditableCellProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = React.useState(initialValue);
  const { state, dispatch } = useContext();
  const isAddColumn = columnId === 'addColumn';

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    dispatch({
      type: ActionConstant.RESIZE_COLUMN,
      columnId,
      value: e.target.value,
    });
  };

  // Update the data when the input is blurred
  const onBlur = () => {
    dispatch({
      type: ActionConstant.SET_CELL_NEW_VALUE,
      rowIndex,
      columnId,
      value,
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' || e.key === 'Enter') {
      // Force blur so we can update value
      inputRef.current?.blur();
      return;
    }
    dispatch({
      type: ActionConstant.MOVE_CURSOR_POSITION,
      key: e.key,
    });
  };

  useEffect(() => {
    if (inputRef.current) {
      if (rowIndex === state.position.y && columnIndex === state.position.x) {
        // focus if we are in the current cell
        inputRef.current.focus();
      }
    }
  }, [columnIndex, rowIndex, state.position.x, state.position.y]);

  const handleOnClickInput = () => {
    dispatch({
      type: ActionConstant.SET_CURSOR_POSITION,
      x: columnIndex,
      y: rowIndex,
    });
  };

  const handleInsertRow = (placement: InsertRowPlacement) => () => {
    dispatch({
      type: ActionConstant.INSERT_ROW_ABOVE_OR_BELOW,
      placement,
      rowIndex,
    });
  };

  const handleInsertColumn = (placement: InsertColumnPlacement) => () => {
    dispatch({
      type: ActionConstant.INSERT_COLUMN_LEFT_OR_RIGHT,
      placement,
      columnIndex,
    });
  };

  const handleRemoveRow = () => {
    dispatch({
      type: ActionConstant.REMOVE_ROW,
      rowIndex,
    });
  };

  const handleRemoveColumn = () => {
    dispatch({
      type: ActionConstant.REMOVE_COLUMN,
      columnIndex,
    });
  };

  return (
    <ContextMenu2
      content={
        <Menu>
          <MenuItem text="Insert row above" onClick={handleInsertRow(InsertRowPlacement.ABOVE)} />
          <MenuItem text="Insert row below" onClick={handleInsertRow(InsertRowPlacement.BELOW)} />
          <MenuItem text="Remove row" onClick={handleRemoveRow} />
          <MenuItem
            text="Insert column left"
            onClick={handleInsertColumn(InsertColumnPlacement.LEFT)}
          />
          <MenuItem
            text="Insert column right"
            onClick={handleInsertColumn(InsertColumnPlacement.RIGHT)}
          />
          <MenuItem text="Remove column" onClick={handleRemoveColumn} />
        </Menu>
      }
    >
      <Input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={inputRef}
        onKeyDown={onKeyDown}
        disabled={isAddColumn}
        onClick={handleOnClickInput}
        data-testid={`input-x-${columnIndex}-y-${rowIndex}`}
        width={width}
      />
    </ContextMenu2>
  );
};

export default EditableCell;
