import { rowsOfNumbers } from "./dataLoad"

type Vector = {
  x: number,
  y: number
}

type Robot = {
  position: Vector,
  velocity: Vector
}

type Range = {
  min: number,
  max: number
}

type Quadrant = {
  rangeX: Range,
  rangeY: Range
}

const wide = 101
const tall = 103

const robots: Robot[] = rowsOfNumbers.map(row => ({
  position: { x: row[0], y: row[1] },
  velocity: { x: row[2], y: row[3] }
}))

function moveRobot100Times(robot: Robot) {
  robot.position.x = (robot.position.x + robot.velocity.x * 100 + wide * 100) % wide
  robot.position.y = (robot.position.y + robot.velocity.y * 100 + tall * 100) % tall
}

robots.forEach(moveRobot100Times)

function countSafetyFactorForQuadrant(quadrant: Quadrant): number {
  return robots
    .filter(robot => robot.position.x >= quadrant.rangeX.min &&
      robot.position.x <= quadrant.rangeX.max &&
      robot.position.y >= quadrant.rangeY.min &&
      robot.position.y <= quadrant.rangeY.max
    ).length
}

const cross: Vector = { x: (wide - 1) / 2, y: (tall - 1) / 2 }
const firstColumn: Range = { min: 0, max: cross.x - 1 }
const secondColumn: Range = { min: cross.x + 1, max: wide - 1 }
const firstRow: Range = { min: 0, max: cross.y - 1 }
const secondRow: Range = { min: cross.y + 1, max: tall - 1 }

const quadrants: Quadrant[] = [
  { rangeX: firstColumn, rangeY: firstRow },
  { rangeX: firstColumn, rangeY: secondRow },
  { rangeX: secondColumn, rangeY: firstRow },
  { rangeX: secondColumn, rangeY: secondRow }
]

const result = quadrants
  .map(countSafetyFactorForQuadrant)
  .reduce((sum, curr) => sum * curr)

console.log(result)
