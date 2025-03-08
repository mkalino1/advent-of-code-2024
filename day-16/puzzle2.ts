import { inputMatrix } from "./dataLoad"

type Point = { x: number, y: number }

type State = {
  point: Point,
  currentCost: number,
  predictedCost: number
  direction: number
  value: string,
  previous: State | null
}

const reindeerPosition: Point = { x: 1, y: inputMatrix.length - 2 }
const endPosition: Point = { x: inputMatrix.length - 2, y: 1 }
const directionsVectors = [[0, 1], [1, 0], [0, -1], [-1, 0]]

function generateNextStates(state: State): State[] {
  return directionsVectors
    .map((direction, neighbourDirection) => ({
      point: { x: state.point.x + direction[1], y: state.point.y + direction[0] },
      direction: neighbourDirection,
      value: inputMatrix[state.point.y + direction[0]]?.[state.point.x + direction[1]],
      currentCost: state.currentCost + 1 + calculateTurningCost(state.direction, neighbourDirection),
      predictedCost: 0,
      previous: state
    }))
    .filter(obj => Boolean(obj.value) && obj.value !== '#')
    .map(predictCostToEnd)
}

function calculateTurningCost(currentDirection: number, neighbourDirection: number) {
  if (currentDirection == neighbourDirection) return 0
  if (Math.abs(currentDirection - neighbourDirection) == 2) return 2000
  return 1000
}

function predictCostToEnd(state: State) {
  // Calculate minimal cost to finish maze (heuristic) 
  const minXMoves = endPosition.x - state.point.x
  const minYMoves = state.point.y - endPosition.y
  const minTurns = (minXMoves == 0 || minYMoves == 0) ? 0 : 1
  const wrongDirection = (state.direction == 2 || state.direction == 3) ? 1 : 0
  const costToEnd = minXMoves + minYMoves + (minTurns + wrongDirection) * 1000
  state.predictedCost = state.currentCost + costToEnd
  return state
}

const visited = new Map<string, number>()
const initialState: State = { point: reindeerPosition, currentCost: 0, predictedCost: 0, direction: 0, value: 'S', previous: null }
let statesToVisit: State[] = [initialState]
let current: State = initialState


let iterations = 0
const winningStates: State[] = []
while (winningStates.length == 0 || current.currentCost <= winningStates[0].currentCost) {
  iterations++
  current = statesToVisit.pop() as State

  // No point of genrating next states if already visited with the same direction and smaller cost
  const key = `${current.point.x}-${current.point.y}-${current.direction}`
  if (visited.has(key) && visited.get(key) < current.currentCost) continue
  visited.set(key, current.currentCost)

  // Generate next states and add them to sorted pool
  statesToVisit = statesToVisit.concat(generateNextStates(current))
  statesToVisit.sort((a, b) => b.predictedCost - a.predictedCost)

  if (current.value == 'E') {
    winningStates.push(current)
  }
}

console.log('Winning states length: ', winningStates.length)

const tribunes = new Set<string>()
tribunes.add(`${initialState.point.x}-${initialState.point.y}`)

winningStates.forEach(winningState => {
  let current = winningState
  while (current.previous != null) {
    tribunes.add(`${current.point.x}-${current.point.y}`)
    current = current.previous
  }
})

console.log(tribunes.size)

console.log('Iterations: ', iterations)

console.log(winningStates[0].currentCost)