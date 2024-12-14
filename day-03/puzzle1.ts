import inputAsString from "./dataLoad";

const mulInstructions = /mul\(([0-9]+),([0-9]+)\)/g;

// Mapping it to capture group 1 * capture group 2
const array = [...inputAsString.matchAll(mulInstructions)].map(
  (found): number => Number(found[1]) * Number(found[2])
);

const sum = array.reduce((a, b) => a + b);
console.log(sum);
