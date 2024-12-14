import inputAsString from "./dataLoad";

const phrasesRegex = /do\(\)|don't\(\)|mul\(([0-9]+),([0-9]+)\)/g;

// Mapping it to [phrase, capture group 1, capture group 2]
const foundPhrases = [...inputAsString.matchAll(phrasesRegex)].map(
  (el): [string, number, number] => [el[0], Number(el[1]), Number(el[2])]
);

let sum = 0;
let lastConditionalInstruction: string | null = null;
foundPhrases.forEach((el) => {
  if (el[0] === "do()") {
    lastConditionalInstruction = "do";
  } else if (el[0] === "don't()") {
    lastConditionalInstruction = "dont";
  } else if (el[0].includes("mul(") && lastConditionalInstruction !== "dont") {
    sum += el[1] * el[2];
  }
});
console.log(sum);
