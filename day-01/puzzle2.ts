import columns from "./dataLoad";

const firstColumn = columns[0];
const secondColumn = columns[1];

const sum = firstColumn
  .map((_, i) => secondColumn.filter((el) => el === firstColumn[i]).length)
  .reduce((sum, occurances, i) => sum + firstColumn[i] * occurances);

console.log(sum);
