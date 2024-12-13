import columns from "./dataLoad";

const firstColumnSorted = columns[0].sort();
const secondColumnSorted = columns[1].sort();

let sum = 0;
for (let i = 0; i < firstColumnSorted.length; i++) {
  sum += Math.abs(firstColumnSorted[i] - secondColumnSorted[i]);
}
console.log(sum);
