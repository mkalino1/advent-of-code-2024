import { coordinates } from "./dataLoad";

type Point = { x: number, y: number }

type State = {
  point: Point,
  cost: number,
  heuristicCost: number
}

const BATCH_SIZE = 1024
const DIMENSIONS = 70

const directionsVectors = [[0, 1], [1, 0], [0, -1], [-1, 0]]
const corrupted: Point[] = coordinates.slice(0, BATCH_SIZE).map(([x, y]) => ({ x, y }))

function generateNextStates(state: State): State[] {
  return directionsVectors
    .map((directionVector) => ({
      point: { x: state.point.x + directionVector[0], y: state.point.y + directionVector[1] },
      cost: state.cost + 1,
      heuristicCost: 0
    }))
    .filter(newState =>
      !corrupted.some(corrupted => corrupted.x == newState.point.x && corrupted.y == newState.point.y) &&
      newState.point.x >= 0 && newState.point.x <= DIMENSIONS &&
      newState.point.y >= 0 && newState.point.y <= DIMENSIONS
    )
    .map(calculateHeuristic)
}

function calculateHeuristic(state: State) {
  state.heuristicCost = state.cost + DIMENSIONS - state.point.x + DIMENSIONS - state.point.y
  return state
}

const initialState: State = { point: { x: 0, y: 0 }, cost: 0, heuristicCost: 0 }
let statesToVisit: State[] = [initialState]
let current: State = initialState
const visited = new Map<string, number>()

// While not at the end position
while (!(current.point.x == DIMENSIONS && current.point.y == DIMENSIONS)) {
  current = statesToVisit.shift() as State
  
  // Don't generate next states if point already visited with lower cost
  const mapKey = `${current.point.x}-${current.point.y}`
  if (visited.has(mapKey) && visited.get(mapKey) <= current.cost) continue
  visited.set(mapKey, current.cost)

  statesToVisit = statesToVisit
    .concat(generateNextStates(current))
    .sort((a, b) => a.heuristicCost - b.heuristicCost)
}

console.log(current.cost)