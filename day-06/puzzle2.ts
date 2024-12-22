import { rows, maxY, maxX } from "./dataLoad";

const directionNames = ["up", "right", "down", "left"];
const directionVectors = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const initialGuardY = rows.findIndex((row) => row.findIndex((tile) => tile === "^") !== -1);
const initialGuardX = rows[initialGuardY].findIndex((tile) => tile === "^");

const invalidObstaclePlacement = new Set<string>();
let obstaclesToAdd = new Set<string>();

const solveMaze = (guardY: number, guardX: number, turnsCounter = 0, guardStates = new Set<string>, obstacle = [-1, -1], options = { isOrigin: true }) => {
  while (isNotOnEdge(guardY, guardX)) {
    // If already visited with the same direction then investigated obstacle is resulting in loop, so break current recursion
    if (guardStates.has(`${guardY}-${guardX}-${currentDirection(turnsCounter)}`)) {
      obstaclesToAdd.add(`${obstacle[0]}-${obstacle[1]}`);
      return;
    }
    guardStates.add(`${guardY}-${guardX}-${currentDirection(turnsCounter)}`);

    const next = nextPosition(guardY, guardX, turnsCounter);
    if (isObstacleAhead(next, obstacle)) {
      turnsCounter += 1;
    } else {
      // If in first recursion try to turn and solve maze from new starting point
      if (options.isOrigin && isObstaclePlacementValid(next)){
        solveMaze(guardY, guardX, turnsCounter + 1, new Set(guardStates), next, { isOrigin: false });
        // Cannot place obstacle on a tile that would mess with the past moves of the guard
        invalidObstaclePlacement.add(`${next[0]}-${next[1]}`);
      }
      [guardY, guardX] = next;
    }
  }
};

const isNotOnEdge = (guardY, guardX) => {
  return guardY < maxY && guardY > 0 && guardX < maxX && guardX > 0
}

const isObstacleAhead = (next: [number, number], obstacle: [number, number]) => {
  return rows[next[0]][next[1]] === "#" || (next[0] === obstacle[0] && next[1] === obstacle[1])
}

const isObstaclePlacementValid = (obstacle: [number, number]) => {
  return !invalidObstaclePlacement.has(`${obstacle[0]}-${obstacle[1]}`)
}

const currentDirection = (turnsCounter: number) => {
  return directionNames[turnsCounter % 4];
}

const nextPosition = (guardY: number, guardX: number, turnsCounter: number): [number, number] => {
  const [directionY, directionX] = directionVectors[turnsCounter % 4];
  return [guardY + directionY, guardX + directionX];
};

solveMaze(initialGuardY, initialGuardX);

console.log(obstaclesToAdd.size);
