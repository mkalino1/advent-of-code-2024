import { heights } from "./dataLoad"

type Point = {
  x: number,
  y: number,
  height: number,
}

const trailheads: Point[] = heights
  .map((row, y) => row
    .map((height, x) => ({ x, y, height }))
    .filter(point => point.height == 0)
  ).flat()

function generateValidNeighbours(point: Point): Point[] {
  const neighboursVectors = [[0, 1], [1, 0], [0, -1], [-1, 0]]
  return neighboursVectors
    .map(vector => ({
      x: vector[0] + point.x,
      y: vector[1] + point.y,
      height: heights[vector[1] + point.y]?.[vector[0] + point.x] || -1
    }))
    .filter(neighbour => neighbour.height != -1 && neighbour.height == point.height + 1)
}

function lookForPaths(currentPoint: Point, availablePaths: { counter: number } = { counter: 0 }) {
  if (currentPoint.height == 9) {
    availablePaths.counter += 1
  }
  generateValidNeighbours(currentPoint)
    .forEach(neighbour =>
      lookForPaths(neighbour, availablePaths)
    )
  return availablePaths.counter
}

const totalScore = trailheads
  .map(trailhead => lookForPaths(trailhead))
  .reduce((sum, score) => sum + score)

console.log(totalScore)

