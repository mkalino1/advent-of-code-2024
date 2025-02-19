import { heights } from "./dataLoad"

type Point = {
  x: number,
  y: number,
  height: number,
}

const neighboursVectors = [[0, 1], [1, 0], [0, -1], [-1, 0]]

const trailheads: Point[] = heights
  .flatMap((row, y) => row
    .map((height, x) => ({ x, y, height }))
    .filter(point => point.height == 0)
  )

function generateValidNeighbours(point: Point): Point[] {
  return neighboursVectors
    .map(vector => ({
      x: vector[0] + point.x,
      y: vector[1] + point.y,
      height: heights[vector[1] + point.y]?.[vector[0] + point.x] || -1
    }))
    .filter(neighbour => neighbour.height != -1 && neighbour.height == point.height + 1)
}

function lookForPaths(currentPoint: Point) {
  if (currentPoint.height == 9) {
    return 1
  }
  return generateValidNeighbours(currentPoint)
    .map(lookForPaths)
    .reduce((sum, paths) => sum + paths, 0)
}

const totalScore = trailheads
  .map(lookForPaths)
  .reduce((sum, score) => sum + score)

console.log(totalScore)

