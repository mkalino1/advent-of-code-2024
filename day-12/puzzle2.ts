import { inputMatrix } from "./dataLoad"

type Plot = {
  x: number,
  y: number,
  plant: string,
  regionId: number,
  validNeighbours: Plot[],
  borders: Set<Border>
}

type Border = 'right' | 'down' | 'left' | 'up'

type Region = {
  area: number,
  sides: number,
  plant: string
}

const neighboursVectors = [[0, 1], [1, 0], [0, -1], [-1, 0]]
const directions: Border[] = ['right', 'down', 'left', 'up']
const regions = new Map<number, Region>()
let nextRegionId = 0

// Prepare matrix of plot objects
const plotsMatrix: Plot[][] = inputMatrix.map((inputRow, y) =>
  inputRow.map((plant, x) => (
    { x, y, plant, regionId: -1, validNeighbours: [], borders: new Set() }
  ))
)
// Prepare neighbourhood data for plot objects
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

function updateRegionData(plot: Plot){
  const alreadyCountedSides = plot.validNeighbours
    .filter(neighbour => neighbour.regionId != -1)
    .map(neighbour => neighbour.borders)
    .reduce((unioned, borders) => unioned.union(borders), new Set())

  // Debugging
  if (plot.plant == 'A') {
    console.log(`Current A plot: ${plot.y}-${plot.x} adding ${plot.borders.difference(alreadyCountedSides).size} | ${[...plot.borders.keys()]}`)    
  }
  
  regions.get(plot.regionId)!.sides += plot.borders.difference(alreadyCountedSides).size
  regions.get(plot.regionId)!.area += 1
}

function traverseRegionRecursively(plot: Plot) {
  plot.validNeighbours.forEach(neighbour => {
    // Skip if already visited
    if (neighbour.regionId == -1) {
      neighbour.regionId = plot.regionId
      updateRegionData(neighbour)
      traverseRegionRecursively(neighbour)
    }
  })
}

// Traverse from plots with no regionId assigned
plotsMatrix.flat().forEach(plot => {
  if (plot.regionId == -1) {
    plot.regionId = nextRegionId++
    regions.set(plot.regionId, { area: 0, sides: 0, plant: plot.plant })
    updateRegionData(plot)
    traverseRegionRecursively(plot)
  }
})

let sum = 0
regions.forEach(region => sum += region.area * region.sides)

console.log(`Sum: ${sum}`)