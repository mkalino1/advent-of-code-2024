import { inputMatrix } from "./dataLoad"

type Point = { x: number, y: number }

type State = {
  point: Point,
  currentCost: number,
  predictedCost: number
  direction: number
  value: string
}

const reindeerPosition: Point = { x: 1, y: inputMatrix.length - 2 }
const endPosition: Point = { x: inputMatrix.length - 2, y: 1 }
const directionsVectors = [[0, 1], [1, 0], [0, -1], [-1, 0]]

function generateNextStates(state: State): State[] {
  return directionsVectors
    .map((directionVector, directionIndex) => ({
      point: { x: state.point.x + directionVector[1], y: state.point.y + directionVector[0] },
      direction: directionIndex,
      value: inputMatrix[state.point.y + directionVector[0]]?.[state.point.x + directionVector[1]],
      currentCost: state.currentCost + 1 + calculateTurningCost(state.direction, directionIndex),
      predictedCost: 0
    }))
    .filter(obj => obj.value !== '#')
    .map(predictCostToEnd)
}

function calculateTurningCost(currentDirection: number, neighbourDirection: number) {
  if (currentDirection == neighbourDirection) return 0
  if (Math.abs(currentDirection - neighbourDirection) == 2) return 2000
  return 1000
}

function predictCostToEnd(state: State) {
  // Calculate minimal cost to finish maze (A* heuristic) 
  const minXMoves = endPosition.x - state.point.x
  const minYMoves = state.point.y - endPosition.y
  const minTurns = (minXMoves == 0 || minYMoves == 0) ? 0 : 1
  const wrongDirection = (state.direction == 2 || state.direction == 3) ? 1 : 0
  const costToEnd = minXMoves + minYMoves + (minTurns + wrongDirection) * 1000
  state.predictedCost = state.currentCost + costToEnd
  return state
}

const visitedTiles = new Map<string, number>()
const initialState: State = { point: reindeerPosition, currentCost: 0, predictedCost: 0, direction: 0, value: 'S' }
let statesToTraverse: State[] = [initialState]
let current: State = initialState

while (current.value != 'E') {
  current = statesToTraverse.pop() as State

  // No point of genrating next states if tile already visited with the same direction and smaller cost
  const key = `${current.point.x}-${current.point.y}-${current.direction}`
  if (visitedTiles.has(key) && visitedTiles.get(key) < current.currentCost) continue
  visitedTiles.set(key, current.currentCost)

  // Generate next states and add them to sorted pool
  statesToTraverse = statesToTraverse
    .concat(generateNextStates(current))
    .sort((a, b) => b.predictedCost - a.predictedCost)
}

console.log(current.currentCost)