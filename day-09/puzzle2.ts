import { inputNumbers } from "./dataLoad";

type Sector = {
  blocks: string[],
  readonly isInitiallyUsed: boolean,
  readonly index: number
}

// Prepare array of sectors
const sectors: Sector[] = []
inputNumbers.map((number, index) => {
  if (index % 2 == 0) {
    sectors.push({
      blocks: Array(number).fill(String(index / 2)),
      isInitiallyUsed: true,
      index
    })
  } else {
    sectors.push({
      blocks: Array(number).fill('_'),
      isInitiallyUsed: false,
      index
    })
  }
})

function findFreePlaceIndexForSector(sectorToMove: Sector): number {
  return sectors
    .slice(0, sectorToMove.index)
    .findIndex(sector => 
      sector.blocks.filter(block => block === '_').length >= sectorToMove.blocks.length
    )
}

sectors
  .toReversed()
  .filter(sector => sector.isInitiallyUsed)
  .forEach(currentSector => {
    const freePlaceIndex = findFreePlaceIndexForSector(currentSector)
    if (freePlaceIndex === -1) {
      return
    }
    // Move blocks from current sector to sector with enough free space
    sectors[freePlaceIndex].blocks.splice(
      sectors[freePlaceIndex].blocks.indexOf('_'),
      currentSector.blocks.length,
      ...currentSector.blocks
    )
    currentSector.blocks = Array(currentSector.blocks.length).fill('_')
  })

const checksum = sectors
  .flatMap(sector => sector.blocks)
  .map((char, index) => ({ char, index }))
  .filter(el => el.char !== '_')
  .reduce((sum, el) => sum + (Number(el.char) * el.index), 0)

console.log(checksum)

