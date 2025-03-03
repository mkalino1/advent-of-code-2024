import { board, instructions } from "./dataLoad"

type Vector = {
  x: number,
  y: number
}

const wideBoard = board.map(row => row.flatMap(el => {
  switch (el) {
    case 'O':
      return ['[', ']']
    case '@':
      return ['@', '.']
    default:
      return [el, el]
  }
}))

const robotPosition: Vector = { x: -1, y: -1 }

// Find initial robot position
wideBoard.forEach((row, i) => {
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
  switch (wideBoard[robotPosition.y + direction.y][robotPosition.x + direction.x]) {
    case '#':
      break
    case '[':
    case ']':
      if (direction.x == 0) {
        moveBoxesVertically(direction, wideBoard[robotPosition.y + direction.y][robotPosition.x + direction.x] == ']')
      } else {
        moveBoxesHorizontally(direction)
      }
      break
    default:
      moveRobot(direction)
  }
}

function moveBoxesVertically(direction: Vector, isRightHalfOfBox: boolean) {
  const boxesToMove: Vector[] = []
  const leftHalfOfFirstBox = { x: robotPosition.x - Number(isRightHalfOfBox), y: robotPosition.y + direction.y }

  if (checkIfCanBeMoved(leftHalfOfFirstBox, direction, boxesToMove)) {
    boxesToMove
      .sort((a, b) => (b.y - a.y) * direction.y)
      .forEach(box => {
        wideBoard[box.y + direction.y][box.x] = '['
        wideBoard[box.y + direction.y][box.x + 1] = ']'
        wideBoard[box.y][box.x] = '.'
        wideBoard[box.y][box.x + 1] = '.'
      })
    moveRobot(direction)
  }
}

function checkIfCanBeMoved(currentBox: Vector, direction: Vector, boxesToMove: Vector[]) {
  if (wideBoard[currentBox.y + direction.y][currentBox.x] == '#' || wideBoard[currentBox.y + direction.y][currentBox.x + 1] == '#') return false

  if (wideBoard[currentBox.y + direction.y][currentBox.x] == '.' && wideBoard[currentBox.y + direction.y][currentBox.x + 1] == '.') {
    boxesToMove.push(currentBox)
    return true
  }
  // The box can be moved if all the childs can be moved
  const canBeMoved = [-1, 0, 1].every(offset => {
    if (wideBoard[currentBox.y + direction.y][currentBox.x + offset] == '[') {
      return checkIfCanBeMoved({ x: currentBox.x + offset, y: currentBox.y + direction.y }, direction, boxesToMove)
    }
    return true
  })
  
  if (canBeMoved) {
    boxesToMove.push(currentBox)
  }
  return canBeMoved
}

function moveBoxesHorizontally(direction: Vector) {
  const firstEmptySpace: Vector = structuredClone(robotPosition)
  // Traverse to first empty space from robot
  while (wideBoard[firstEmptySpace.y][firstEmptySpace.x] != '.') {
    firstEmptySpace.x += direction.x
    if (wideBoard[firstEmptySpace.y][firstEmptySpace.x] == '#') return
  }
  // Move characters while traversing back to robot
  while (wideBoard[firstEmptySpace.y][firstEmptySpace.x] != '@') {
    wideBoard[firstEmptySpace.y][firstEmptySpace.x] = wideBoard[firstEmptySpace.y][firstEmptySpace.x - direction.x]
    firstEmptySpace.x -= direction.x
  }
  wideBoard[robotPosition.y][robotPosition.x] = '.'
  robotPosition.x += direction.x
}

function moveRobot(direction: Vector) {
  wideBoard[robotPosition.y][robotPosition.x] = '.'
  robotPosition.x += direction.x
  robotPosition.y += direction.y
  wideBoard[robotPosition.y][robotPosition.x] = '@'
}

instructions
  .map(getDirectionVector)
  .forEach(processIntruction)

const result = wideBoard
  .flatMap((row, y) => row.map(
    (val, x) => ({ x, y, isBox: val == '[' }))
  )
  .filter(el => el.isBox)
  .reduce((sum, curr) => sum + curr.y * 100 + curr.x, 0)

console.log(result)
