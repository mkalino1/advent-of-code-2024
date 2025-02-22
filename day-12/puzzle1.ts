import { inputMatrix } from "./dataLoad"

type Plot = {
  x: number,
  y: number,
  plant: string,
  region: Region | null
}

type Region = {
  area: number,
  perimeter: number
}

const neighboursVectors = [[0, 1], [1, 0], [0, -1], [-1, 0]]
const regions: Region[] = []

// Build matrix of plot objects
const plotsMatrix: Plot[][] = inputMatrix.map((inputRow, y) =>
  inputRow.map((plant, x) => ({ x, y, plant, region: null }))
)

function generateSamePlantNeighbours(plot: Plot): Plot[] {
  return neighboursVectors
    .map(vector => plotsMatrix[plot.y + vector[0]]?.[plot.x + vector[1]])
    .filter(neighbour => Boolean(neighbour) && neighbour.plant == plot.plant)
}

function traverseRegionRecursively(plot: Plot) {
  const neighbours = generateSamePlantNeighbours(plot)
  
  plot.region!.area += 1
  plot.region!.perimeter += 4 - neighbours.length

  neighbours.forEach(neighbour => {
    // Skip if already traversed
    if (neighbour.region == null) {
      neighbour.region = plot.region
      traverseRegionRecursively(neighbour)
    }
  })
}

plotsMatrix.flat().forEach(plot => {
  if (plot.region == null) {
    const newRegion: Region = { area: 0, perimeter: 0 }
    plot.region = newRegion
    regions.push(newRegion)

    traverseRegionRecursively(plot)
  }
})

const sum = regions
  .map(region => region.area * region.perimeter)
  .reduce((sum, curr) => sum + curr)

console.log(sum)

