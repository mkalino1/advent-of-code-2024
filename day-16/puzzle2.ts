import { inputMatrix } from "./dataLoad"

type Point = { x: number, y: number }

type State = {
  point: Point,
  cost: number,
  direction: number
  value: string,
  previous: State | null
}

const reindeerPosition: Point = { x: 1, y: inputMatrix.length - 2 }
const directionsVectors = [[0, 1], [1, 0], [0, -1], [-1, 0]]

function generateNextStates(state: State): State[] {
  return directionsVectors
    .map((directionVector, directionIndex) => ({
      point: { x: state.point.x + directionVector[1], y: state.point.y + directionVector[0] },
      direction: directionIndex,
      value: inputMatrix[state.point.y + directionVector[0]]?.[state.point.x + directionVector[1]],
      cost: state.cost + 1 + calculateTurningCost(state.direction, directionIndex),
      previous: state
    }))
    .filter(obj => obj.value !== '#')
}

function calculateTurningCost(currentDirection: number, neighbourDirection: number) {
  if (currentDirection == neighbourDirection) return 0
  if (Math.abs(currentDirection - neighbourDirection) == 2) return 2000
  return 1000
}

const visitedTiles = new Map<string, number>()
const initialState: State = { point: reindeerPosition, cost: 0, direction: 0, value: 'S', previous: null }
let statesToTraverse: State[] = [initialState]
let current: State = initialState
const winningStates: State[] = []

// Traversing loop ends after getting every winning path
while (winningStates.length == 0 || current.cost <= winningStates[0].cost) {
  current = statesToTraverse.pop() as State

  if (current.value == 'E') {
    winningStates.push(current)
    continue
  }

  // No point of genrating next states if tile already visited with the same direction and smaller cost
  const key = `${current.point.x}-${current.point.y}-${current.direction}`
  if (visitedTiles.has(key) && visitedTiles.get(key) < current.cost) continue
  visitedTiles.set(key, current.cost)

  // Generate next states and add them to sorted pool
  statesToTraverse = statesToTraverse
    .concat(generateNextStates(current))
    .sort((a, b) => b.cost - a.cost)
}

const tribunesSize = winningStates
  .reduce((tribunes, winningState) => {
    let current = winningState
    while (current.previous != null) {
      tribunes.add(`${current.point.x}-${current.point.y}`)
      current = current.previous
    }
    return tribunes
  }, new Set<string>()).size + 1

console.log(tribunesSize) 