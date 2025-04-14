import { inputMatrix } from "./dataLoad"

const DIRECTIONS = [[-1, 0], [0, 1], [1, 0], [0, -1]]

type TrackTile = {
  x: number
  y: number
  toEnd: number
}

const track: TrackTile[] = []

inputMatrix.forEach((row, y) =>
  row.forEach((tile, x) => {
    if (tile == "S") track.push({ x, y, toEnd: -1 })
  })
)

function findTrack(tile: TrackTile) {
  let isScanningDone = false
  DIRECTIONS.forEach(dir => {
    const candidateY = tile.y + dir[0]
    const candidateX = tile.x + dir[1]

    if (inputMatrix[candidateY][candidateX] == '.') {
      track.push({x: candidateX, y: candidateY, toEnd: -1})
      // Mark as visited
      inputMatrix[candidateY][candidateX] = 'x'
    } else if (inputMatrix[candidateY][candidateX] == 'E') {
      track.push({x: candidateX, y: candidateY, toEnd: -1})
      isScanningDone = true
    }
  })
  return isScanningDone
}

while (!findTrack(track.at(-1) as TrackTile)) {}

track.forEach((tile, i) => {
  tile.toEnd = track.length - i - 1
})

let cheatsNumber = 0

track.forEach(tile => {
  track.forEach(candidate => {
    const distance = Math.abs(candidate.x - tile.x) + Math.abs(candidate.y - tile.y)
    if (distance <= 20 && tile.toEnd - candidate.toEnd - distance >= 100) {
      cheatsNumber += 1
    }
  })
})

console.log(cheatsNumber)
