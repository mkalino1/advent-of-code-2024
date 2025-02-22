import { inputMatrix } from "./dataLoad"

type Plot = {
  x: number,
  y: number,
  plant: string,
  validNeighbours: Plot[],
  borders: Set<Border>,
  isTraversed: boolean
}

type Border = 'up' | 'right' | 'down' | 'left'

type Region = {
  sides: number,
  plots: Plot[]
}

type Scanner = {
  range: number[],
  primaryAxis: string,
  secondaryAxis: string,
  border: Border
}

const neighboursVectors = [[-1, 0], [0, 1], [1, 0], [0, -1]]
const directions: Border[] = ['up', 'right', 'down', 'left']
const regions: Region[] = []

// Prepare matrix of plot objects
const plotsMatrix: Plot[][] = inputMatrix.map((inputRow, y) =>
  inputRow.map((plant, x) => (
    { x, y, plant, validNeighbours: [], borders: new Set(), isTraversed: false }
  ))
)

// Prepare neighbours and borders data for plot objects
plotsMatrix.flat().forEach(plot => {
  neighboursVectors
    .map(vector => plotsMatrix[plot.y + vector[0]]?.[plot.x + vector[1]])
    .forEach((neighbour, i) => {
      // Each direction is either valid neighbour or fence border
      if (Boolean(neighbour) && neighbour.plant == plot.plant) {
        plot.validNeighbours.push(neighbour)
      } else {
        plot.borders.add(directions[i])
      }
    })
})

// Prepare regions data by traversing recursively
function traverseRegionRecursively(plot: Plot, region: Region | null) {
  if (plot.isTraversed) return
  plot.isTraversed = true

  if (region == null) {
    const newRegion: Region = { plots: [], sides: 0 }
    regions.push(newRegion)
    region = newRegion
  }
  region.plots.push(plot)

  plot.validNeighbours.forEach(neighbour => traverseRegionRecursively(neighbour, region))
}
plotsMatrix.flat().forEach(plot => { traverseRegionRecursively(plot, null) })

// Scan region to count its sides
function scanRegion(region: Region, scanner: Scanner) {
  scanner.range.map(currentPrimaryAxis => {
    const detectedBorders: number[] = region.plots
      .filter(plot => plot[scanner.primaryAxis] == currentPrimaryAxis && plot.borders.has(scanner.border))
      .map(plot => plot[scanner.secondaryAxis])
      .sort((a, b) => a - b)

    region.sides += calculateNumberOfSides(detectedBorders)
  })
}

function calculateNumberOfSides(bordersOnAxis: number[]) {
  return bordersOnAxis.reduce((previous: number[], curr) => {
    if (previous.at(-1) == curr - 1) previous.pop()
    previous.push(curr)
    return previous
  }, []).length
}

regions.forEach(region => {
  // Bounding box of region
  const rangeY = Array.from(region.plots.map(plot => plot.y).reduce((range, curr) => range.add(curr), new Set())) as number[]
  const rangeX = Array.from(region.plots.map(plot => plot.x).reduce((range, curr) => range.add(curr), new Set())) as number[]

  // Scanners for each border direction
  const scanners: Scanner[] = [
    { range: rangeY, primaryAxis: 'y', secondaryAxis: 'x', border: 'up' },
    { range: rangeY, primaryAxis: 'y', secondaryAxis: 'x', border: 'down' },
    { range: rangeX, primaryAxis: 'x', secondaryAxis: 'y', border: 'right' },
    { range: rangeX, primaryAxis: 'x', secondaryAxis: 'y', border: 'left' },
  ]
  scanners.forEach(scanner => scanRegion(region, scanner))
})

const sum = regions
  .map(region => region.plots.length * region.sides)
  .reduce((sum, curr) => sum + curr)

console.log(sum)