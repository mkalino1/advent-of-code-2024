import {
  rows,
  columns,
  diagonalsBackslash,
  diagonalsSlash,
} from "../day-04/dataLoad";

const sum = [...rows, ...columns, ...diagonalsBackslash, ...diagonalsSlash]
  .map(
    (row: string): number =>
      row.split("XMAS").length - 1 + row.split("SAMX").length - 1
  )
  .reduce((a, b) => a + b);

console.log(sum);
