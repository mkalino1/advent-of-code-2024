import rows from "./dataLoad.ts";

const isDecreasingCorrectly = (row: number[]): boolean =>
  !row
    .slice(0, -1)
    .map((el, i) => el - row[i + 1])
    .some((diff) => diff < 1 || diff > 3);

const isIncreasingCorrectly = (row: number[]): boolean =>
  !row
    .slice(0, -1)
    .map((el, i) => row[i + 1] - el)
    .some((diff) => diff < 1 || diff > 3);

const checkIfValid = (row: number[]): boolean => {
  return isDecreasingCorrectly(row) || isIncreasingCorrectly(row);
};

const sum = rows
  .map((row) => checkIfValid(row))
  .map(Number)
  .reduce((sum, curr) => sum + curr);

console.log(sum);
