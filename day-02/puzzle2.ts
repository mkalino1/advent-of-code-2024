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
  const rowPermutations: number[][] = row.map((_, i) => row.toSpliced(i, 1));
  return rowPermutations.some(
    (permutation) =>
      isDecreasingCorrectly(permutation) || isIncreasingCorrectly(permutation)
  );
};

let sum = 0;
for (const row of rows) {
  sum += Number(checkIfValid(row));
}
console.log(sum);
