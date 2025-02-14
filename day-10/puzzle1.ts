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

function lookForPeaks(currentPoint: Point, availablePeaks: Set<string>) {
  if (currentPoint.height == 9) {
    availablePeaks.add(`${currentPoint.x}-${currentPoint.y}`)
  }
  generateValidNeighbours(currentPoint)
    .forEach(neighbour =>
      lookForPeaks(neighbour, availablePeaks)
    )
}

const totalScore = trailheads
  .map(trailhead => {
    const availablePeaks = new Set<string>()
    lookForPeaks(trailhead, availablePeaks)
    return availablePeaks.size
  })
  .reduce((sum, score) => sum + score)

console.log(totalScore)

