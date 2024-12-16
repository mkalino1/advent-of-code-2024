const generateRulesMap = (rules) =>
  rules.reduce((map, rule) => {
    map.get(rule[0])
      ? map.get(rule[0]).push(rule[1])
      : map.set(rule[0], [rule[1]]);
    return map;
  }, new Map());

const isUpdateInvalid = (update: number[], rulesMap: Map<number, number[]>) =>
  update.some((currPage: number, i: number) =>
    // For every page to the right of the current page
    update
      .slice(i + 1)
      .some((pageToTheRight) =>
        rulesMap.get(pageToTheRight)?.includes(currPage)
      )
  );

export { generateRulesMap, isUpdateInvalid };
