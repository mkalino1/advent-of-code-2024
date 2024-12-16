import { generateRulesMap, isUpdateInvalid } from "./common";
import { rules, updates } from "./dataLoad";

const rulesMap = generateRulesMap(rules);

const sum = updates
  .filter((update) => !isUpdateInvalid(update, rulesMap))
  .reduce((sum, update) => sum + update[Math.floor(update.length / 2)], 0);

console.log(sum);
