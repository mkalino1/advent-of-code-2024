import { rowsOfNumbers } from "./dataLoad"

type Vector = {
  x: number,
  y: number
}

type Robot = {
  position: Vector,
  velocity: Vector
}

const WIDE = 101
const TALL = 103

const robots: Robot[] = rowsOfNumbers.map(row => ({
  position: { x: row[0], y: row[1] },
  velocity: { x: row[2], y: row[3] }
}))

function moveRobotOneTime(robot: Robot) {
  robot.position.x = (robot.position.x + robot.velocity.x + WIDE) % WIDE
  robot.position.y = (robot.position.y + robot.velocity.y + TALL) % TALL
}

function detectTree() {
  let seconds = 0
  let isDetected = false
  while (!isDetected) {
    seconds += 1
    robots.forEach(moveRobotOneTime)
    
    buildBoard().forEach(row => {
      const linesOfRobots = row.join('').split('.')
      const longestLine = Math.max(...linesOfRobots.map(line => line.length))
      if (longestLine > 20) {
        isDetected = true
        return
      }      
    })
  }
  return seconds
}

function buildBoard() {
  const board: string[][] = Array.from({length: TALL}).map(row => Array(WIDE).fill('.'))
  robots.forEach(robot => {
    board[robot.position.y][robot.position.x] = 'X'
  })
  return board
}

function paintBoardState() {
  buildBoard().forEach(row => console.log(row.join('')))
}

const secondsPassed = detectTree()
paintBoardState()
console.log(secondsPassed)
