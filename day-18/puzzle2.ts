import { coordinates } from "./dataLoad";

type Point = { x: number, y: number }

type State = {
  point: Point,
  cost: number,
  heuristicCost: number
}

const DIMENSIONS = 70
const DIRECTIONS = [[0, 1], [1, 0], [0, -1], [-1, 0]]

const allCorrupted: Point[] = coordinates.map(([x, y]) => ({ x, y }))

function generateNextStates(state: State, corrupted: Point[]): State[] {
  return DIRECTIONS
    .map((direction) => ({
      point: { x: state.point.x + direction[0], y: state.point.y + direction[1] },
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

function simulateEscapeForDepth(depth: number) {
  const corrupted = allCorrupted.slice(0, depth + 1)
  const initialState: State = { point: { x: 0, y: 0 }, cost: 0, heuristicCost: 0 }
  let statesToVisit: State[] = [initialState]
  let current: State = initialState
  const visited = new Map<string, number>()

  while (!(current.point.x == DIMENSIONS && current.point.y == DIMENSIONS)) {
    // If no states to visit left it means there is no escape, so we found the solution
    if (statesToVisit.length == 0) return true

    current = statesToVisit.shift() as State

    // Don't generate next states if point already visited with lower cost
    const mapKey = `${current.point.x}-${current.point.y}`
    if (visited.has(mapKey) && visited.get(mapKey) <= current.cost) continue
    visited.set(mapKey, current.cost)

    // Generate next states and add it to the sorted pool
    statesToVisit = statesToVisit
      .concat(generateNextStates(current, corrupted))
      .sort((a, b) => a.heuristicCost - b.heuristicCost)
  }
  return false
}

let depth = 1024
let isSolved = false

// This might take 30 seconds
while (!isSolved) {
  depth += 1
  isSolved = simulateEscapeForDepth(depth)
}

const solution = Object.values(allCorrupted[depth]).join(',')

console.log(solution)