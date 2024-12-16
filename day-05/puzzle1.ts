import { generateRulesMap, isUpdateInvalid } from "./common";
import { rules, updates } from "./dataLoad";

const rulesMap = generateRulesMap(rules);

let sum = 0;

updates.forEach((update: number[]) => {
  sum +=
    update[Math.floor(update.length / 2)] *
    Number(!isUpdateInvalid(update, rulesMap));
});

console.log(sum);
