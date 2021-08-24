import React, { useMemo, useCallback } from 'react';
import { useTable, Column } from 'react-table';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import EditableCell from './EditCell';
import { RowDataType, RowType } from '../types';
import { useContext } from '../context';
import { ActionConstant } from '../constants';

const TableStyle = styled.table`
  border-spacing: 0;
  border: 1px solid #e8eaee;
`;

const Header = styled.thead`
  background: #e8eeef;
  color: #175062;
`;

const HeaderRow = styled.tr`
  :last-child {
    td {
      border-bottom: 0;
    }
  }
`;

const Row = styled.tr<RowType>`
  :last-child {
    td {
      border-bottom: 0;
    }
  }
  background: ${(props) => (props.index % 2 === 0 ? 'white' : '#F5F7F7')};
`;

const HeaderCell = styled.th`
  margin: 0;
  padding: 0.5rem;
  border-bottom: 1px solid #e8eaee;
  border-right: 1px solid #e8eaee;
  :last-child {
    border-right: 0;
  }
`;

const RowCell = styled.td`
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #e8eaee;
  border-right: 1px solid #e8eaee;
  :last-child {
    border-right: 0;
    background-color: white;
    border-bottom: 0px;
    border-right: 0px;
  }
`;

const RowNumber = styled.span`
  color: #175062;
  padding: 1rem;
`;

const AddRowButton = styled.button`
  padding: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const AddColumnButton = styled.button`
  padding: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const FooterCell = styled.td`
  border-top: 1px solid #e8eaee;
`;

const Table: React.FC = () => {
  const { state, dispatch } = useContext();

  const handleAddRow = useCallback(() => {
    dispatch({
      type: ActionConstant.INSERT_NEW_ROW_TO_THE_END,
    });
  }, [dispatch]);

  const handleAddColumn = useCallback(() => {
    dispatch({
      type: ActionConstant.INSERT_NEW_COLUMN_TO_THE_END,
    });
  }, [dispatch]);

  const tableColumns: Column<RowDataType>[] = useMemo(
    () => [
      {
        Header: () => null, // No header for adding a new row
        id: 'addRow', // since no accessor we need an id
        Cell: ({ row }: { row: { index: number } }) => <RowNumber>{row.index + 1}</RowNumber>,
        Footer: () => {
          return (
            <AddRowButton onClick={handleAddRow} data-testid="add-row">
              <FaPlus color="#175062" />
            </AddRowButton>
          );
        },
      },
      ...state.columnData,
      {
        Header: () => (
          <AddColumnButton onClick={handleAddColumn} data-testid="add-column">
            <FaPlus color="#175062" />
          </AddColumnButton>
        ),
        id: 'addColumn', // since no accessor we need an id
      },
    ],
    [handleAddColumn, handleAddRow, state.columnData]
  );

  const getRowId = useCallback((row: { id: string }) => {
    return row.id;
  }, []);

  const { rows, getTableProps, getTableBodyProps, headerGroups, footerGroups, prepareRow } =
    useTable({
      columns: tableColumns,
      data: state.rowData,
      defaultColumn: { Cell: EditableCell },
      getRowId,
    });

  return (
    <TableStyle {...getTableProps()}>
      <Header>
        {headerGroups.map((headerGroup) => (
          <HeaderRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <HeaderCell {...column.getHeaderProps()} data-testid={`column-${index}`}>
                {column.render('Header')}
              </HeaderCell>
            ))}
          </HeaderRow>
        ))}
      </Header>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <Row {...row.getRowProps()} index={index} data-testid={`row-${index}`}>
              {row.cells.map((cell) => {
                return <RowCell {...cell.getCellProps()}>{cell.render('Cell')}</RowCell>;
              })}
            </Row>
          );
        })}
      </tbody>
      <tfoot>
        {footerGroups.map((group) => (
          <tr {...group.getFooterGroupProps()}>
            {group.headers.map((column) => (
              <FooterCell {...column.getFooterProps()}>{column.render('Footer')}</FooterCell>
            ))}
          </tr>
        ))}
      </tfoot>
    </TableStyle>
  );
};

export default Table;
