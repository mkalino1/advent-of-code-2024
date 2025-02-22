import { inputMatrix } from "./dataLoad"

type Plot = {
  x: number,
  y: number,
  plant: string,
  regionId: number,
  validNeighbours: Plot[],
  borders: Set<Border>,
}

type Border = 'up' | 'right' | 'down' | 'left'

type Region = {
  area: number,
  sides: number,
  plant: string,
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
const regions = new Map<number, Region>()
let nextRegionId = 0


// Prepare matrix of plot objects
const plotsMatrix: Plot[][] = inputMatrix.map((inputRow, y) =>
  inputRow.map((plant, x) => (
    { x, y, plant, regionId: -1, validNeighbours: [], borders: new Set() }
  ))
)


// Prepare neighbourhood and borders data for plot objects
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
function traverseRegionRecursively(plot: Plot) {
  plot.validNeighbours.forEach(neighbour => {
    // Skip if already visited
    if (neighbour.regionId == -1) {
      regions.get(plot.regionId)!.plots.push(neighbour)
      neighbour.regionId = plot.regionId
      traverseRegionRecursively(neighbour)
    }
  })
}

plotsMatrix.flat().forEach(plot => {
  // Traverse from plots with no regionId assigned
  if (plot.regionId == -1) {
    // Initialize region
    plot.regionId = nextRegionId++
    regions.set(plot.regionId, { area: 0, sides: 0, plant: plot.plant, plots: [] })
    regions.get(plot.regionId)!.plots.push(plot)
    traverseRegionRecursively(plot)
  }
})


// Scan region to count sides
function scanRegion(region: Region, params: Scanner) {
  Array.from(params.range).map(scannedAxis => {
    const detectedBorders: number[] = region.plots
      .filter(plot => plot[params.primaryAxis] == scannedAxis && plot.borders.has(params.border))
      .map(plot => plot[params.secondaryAxis])
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

[...regions.values()].forEach(region => {
  // Bounding box of region
  const rangeY = Array.from(region.plots.map(plot => plot.y).reduce((range, curr) => range.add(curr), new Set())) as number[]
  const rangeX = Array.from(region.plots.map(plot => plot.x).reduce((range, curr) => range.add(curr), new Set())) as number[]

  // Scanners for each direction
  const scanners: Scanner[] = [
    { range: rangeY, primaryAxis: 'y', secondaryAxis: 'x', border: 'up' },
    { range: rangeY, primaryAxis: 'y', secondaryAxis: 'x', border: 'down' },
    { range: rangeX, primaryAxis: 'x', secondaryAxis: 'y', border: 'right' },
    { range: rangeX, primaryAxis: 'x', secondaryAxis: 'y', border: 'left' },
  ]
  
  scanners.forEach(scanner => scanRegion(region, scanner))
})

let sum = 0
regions.forEach(region => sum += region.plots.length * region.sides)
console.log(sum)