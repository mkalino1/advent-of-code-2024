import { generateRulesMap, isUpdateInvalid } from "./common";
import { rules, updates } from "./dataLoad";

const rulesMap = generateRulesMap(rules);

const reorderOnePageInUpdateIfNeeded = (update: number[]): boolean => {
  let pageToMoveAfterIdx = -1;

  // Find index of first page that have wrong pages on the right
  const pageToBeMovedIdx: number = update.findIndex(
    (currPage: number, i: number) => {
      // Find index of last page to the right of the current that should have current to the right
      pageToMoveAfterIdx = update
        .slice(i + 1)
        .findLastIndex((pageToTheRight: number) =>
          rulesMap.get(pageToTheRight)?.includes(currPage)
        );
      if (pageToMoveAfterIdx === -1) return false;
      // Translate the inner slice index to the outer origin index
      pageToMoveAfterIdx += i + 1;
      return true;
    }
  );
  if (pageToBeMovedIdx === -1) return false;
  movePageInUpdate(update, pageToBeMovedIdx, pageToMoveAfterIdx);
  return true;
};

const movePageInUpdate = (update: number[], pageToBeMovedIdx, pageToMoveAfterIdx) => {
  const movedPage: number = update.splice(pageToBeMovedIdx, 1)[0];
  update.splice(pageToMoveAfterIdx, 0, movedPage);
};

const sum = updates
  .filter((update) => isUpdateInvalid(update, rulesMap))
  .map((update) => {
    while (reorderOnePageInUpdateIfNeeded(update)) {}
    return update;
  })
  .reduce((sum, update) => sum + update[Math.floor(update.length / 2)], 0);
console.log(sum);
