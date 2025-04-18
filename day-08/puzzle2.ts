import { antennasLocations, maxXIndex, maxYIndex, Point } from "./dataLoad"

const antinodes = new Set<string>()

antennasLocations.forEach(antennaPoints => {
  antennaPoints.forEach(antenna1 => {
    antennaPoints.forEach(antenna2 => {
      if (antenna1 === antenna2) {
        antinodes.add(`${antenna1.x}-${antenna1.y}`)
        return
      }
      const antinodeVector: Point = { x: antenna1.x - antenna2.x, y: antenna1.y - antenna2.y }
      const antinode: Point = { x: antenna1.x + antinodeVector.x, y: antenna1.y + antinodeVector.y }
      while (antinode.x >= 0 && antinode.y >= 0 && antinode.x <= maxXIndex && antinode.y <= maxYIndex) {
        antinodes.add(`${antinode.x}-${antinode.y}`)
        antinode.x += antinodeVector.x
        antinode.y += antinodeVector.y
      }
    })
  })
})

console.log(antinodes.size)