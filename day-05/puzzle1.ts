import { rules, updates } from "./dataLoad";

const rulesMap: Map<number, number[]> = rules.reduce((map, rule) => {
  map.get(rule[0])
    ? map.get(rule[0]).push(rule[1])
    : map.set(rule[0], [rule[1]]);
  return map;
}, new Map());

let sum = 0;

updates.forEach((update: number[]) => {
  const isUpdateInvalid = update.some((currPage, i) =>
    // For every page to the right of the current page
    update.slice(i + 1)
      .some((pageToTheRight) =>
        rulesMap.get(pageToTheRight)?.includes(currPage)
      )
  );

  sum += update[Math.floor(update.length / 2)] * Number(!isUpdateInvalid);
});

console.log(sum);
