import { board, instructions } from "./dataLoad";

type Vector = {
  x: number,
  y: number
}

const robotPosition: Vector = { x: -1, y: -1 }

// Find initial robot position
board.forEach((row, i) => {
  const robotInRowIndex = row.indexOf('@')
  if (robotInRowIndex != -1) {
    robotPosition.y = i
    robotPosition.x = robotInRowIndex
  }
})

function getDirectionVector(instruction: string): Vector {
  switch (instruction) {
    case '>':
      return { x: 1, y: 0 }
    case 'v':
      return { x: 0, y: 1 }
    case '<':
      return { x: -1, y: 0 }
    case '^':
      return { x: 0, y: -1 }
    default:
      throw new Error('Invalid instruction');
  }
}

function processIntruction(direction: Vector) {
  switch (board[robotPosition.y + direction.y][robotPosition.x + direction.x]) {
    case '#':
      break
    case 'O':
      moveLine(direction)
      break
    default:
      moveRobot(direction)
  }
}

function moveRobot(direction: Vector) {
  board[robotPosition.y][robotPosition.x] = '.'
  robotPosition.x += direction.x
  robotPosition.y += direction.y
  board[robotPosition.y][robotPosition.x] = '@'
}

function moveLine(direction: Vector) {
  const firstEmptySpace: Vector = structuredClone(robotPosition)

  while (board[firstEmptySpace.y][firstEmptySpace.x] != '.') {
    firstEmptySpace.x += direction.x
    firstEmptySpace.y += direction.y
    if (board[firstEmptySpace.y][firstEmptySpace.x] == '#') return
  }
  moveRobot(direction)
  board[firstEmptySpace.y][firstEmptySpace.x] = 'O'
}

instructions
  .map(getDirectionVector)
  .forEach(processIntruction)

const result = board
  .flatMap((row, y) => row.map(
    (val, x) => ({ x, y, isBox: val == 'O' }))
  )
  .filter(el => el.isBox)
  .reduce((sum, curr) => sum + curr.y * 100 + curr.x, 0)

console.log(result)
