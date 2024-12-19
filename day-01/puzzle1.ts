import columns from "./dataLoad";

const firstColumnSorted = columns[0].sort();
const secondColumnSorted = columns[1].sort();

const sum = firstColumnSorted
  .map((_, i) => Math.abs(firstColumnSorted[i] - secondColumnSorted[i]))
  .reduce((sum, curr) => sum + curr);

console.log(sum);
