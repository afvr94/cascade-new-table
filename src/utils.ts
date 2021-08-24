import { RowDataType } from './types';

export function getColumnWidth(rows: RowDataType[], accessor: string, value: string): number {
  const maxWidth = 400;
  const minWidth = 200;
  const magicSpacing = 10;
  const cellLength = Math.max(
    ...rows.map((row) => (`${row[accessor]}` || '').length),
    value.length
  );
  const width = Math.max(minWidth, cellLength * magicSpacing);
  return width > maxWidth ? maxWidth : width;
}
