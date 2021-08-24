// default datasets
import { v4 as uuidv4 } from 'uuid';
import { RowDataType } from './types';

export const rowData: RowDataType[] = [
  { id: uuidv4(), data0: '', data1: '', data2: '' },
  { id: uuidv4(), data0: '', data1: '', data2: '' },
  { id: uuidv4(), data0: '', data1: '', data2: '' },
];

export const columnData = [
  {
    Header: 'Label 1',
    accessor: 'data0',
    index: 0,
    width: 200,
  },
  {
    Header: 'Label 2',
    accessor: 'data1',
    index: 1,
    width: 200,
    minWidth: 20,
  },
  {
    Header: 'Label 3',
    accessor: 'data2',
    index: 2,
    width: 200,
  },
];
