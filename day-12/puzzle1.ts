import { inputMatrix } from "./dataLoad"

type plot = {
  x: number,
  y: number,
  plant: string,
  regionId: number
}

type region = {
  area: number,
  perimeter: number
}

const neighboursVectors = [[0, 1], [1, 0], [0, -1], [-1, 0]]
const regions = new Map<number, region>()
let nextRegionId = 0

// Build matrix of plot objects
const plotsMatrix: plot[][] = inputMatrix.map((inputRow, y) =>
  inputRow.map((plant, x) => ({ x, y, plant, regionId: -1 }))
)

function generateSamePlantNeighbours(plot: plot): plot[] {
  return neighboursVectors
    .map(vector => plotsMatrix[plot.y + vector[0]]?.[plot.x + vector[1]])
    .filter(neighbour => Boolean(neighbour) && neighbour.plant == plot.plant)
}

function traverseRegionRecursively(plot: plot) {
  const neighbours = generateSamePlantNeighbours(plot)
  
  regions.get(plot.regionId)!.area += 1
  regions.get(plot.regionId)!.perimeter += 4 - neighbours.length

  neighbours.forEach(neighbour => {
    // Skip if already visited
    if (neighbour.regionId == -1) {
      neighbour.regionId = plot.regionId
      traverseRegionRecursively(neighbour)
    }
  })
}

// Traverse from plots with no regionId assigned
plotsMatrix.flat().forEach(plot => {
  if (plot.regionId == -1) {
    plot.regionId = nextRegionId++
    regions.set(plot.regionId, { area: 0, perimeter: 0 })
    traverseRegionRecursively(plot)
  }
})

let sum = 0
regions.forEach(region => sum += region.area * region.perimeter)

console.log(sum)

