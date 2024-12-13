import columns from "./dataLoad";

const firstColumn = columns[0];
const secondColumn = columns[1];

let sum = 0;
for (let i = 0; i < firstColumn.length; i++) {
  const occurrences = secondColumn.filter((el) => el === firstColumn[i]).length;
  sum += firstColumn[i] * occurrences;
}
console.log(sum);
