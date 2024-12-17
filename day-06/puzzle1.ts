import { rows, maxY, maxX } from "./dataLoad";

let guardY = rows.findIndex((row) => row.findIndex((tile) => tile === "^") !== -1);
let guardX = rows[guardY].findIndex((tile) => tile === "^");

// Up, right, down, left
const directions = [[-1, 0],[0, 1],[1, 0],[0, -1]];
let turnsCounter = 0;
const traversed = new Set();
traversed.add(`${guardY}-${guardX}`);

const nextPosition = (): [number, number] => {
  const [directionY, directionX] = directions[turnsCounter % 4];
  return [guardY + directionY, guardX + directionX];
};

while (guardY !== maxY && guardY !== 0 && guardX !== maxX && guardX !== 0) {
  const next = nextPosition();
  if (rows[next[0]][next[1]] === "#") {
    turnsCounter += 1;
  } else {
    [guardY, guardX] = next;
    traversed.add(`${guardY}-${guardX}`);
  }
}

console.log(traversed.size);
