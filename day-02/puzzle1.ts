import rows from "./dataLoad.ts";

const isDecreasingCorrectly = (row: number[]): boolean => {
  for (let i = 0; i < row.length - 1; i++) {
    const diff = row[i] - row[i + 1];
    if (diff < 1 || diff > 3) return false;
  }
  return true;
};

const isIncreasingCorrectly = (row: number[]): boolean => {
  for (let i = 0; i < row.length - 1; i++) {
    const diff = row[i + 1] - row[i];
    if (diff < 1 || diff > 3) return false;
  }
  return true;
};

const checkIfValid = (row: number[]): boolean => {
  return isDecreasingCorrectly(row) || isIncreasingCorrectly(row);
};

let sum = 0;
for (const row of rows) {
  sum += Number(checkIfValid(row));
}
console.log(sum);
