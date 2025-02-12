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
  let freeIndex = 1
  while (freeIndex < sectors.length && freeIndex < sectorToMove.index) {
    const isFreePlace = sectors[freeIndex].blocks.filter(block => block === '_').length >= sectorToMove.blocks.length
    if (isFreePlace) {
      return freeIndex
    }
    freeIndex += 1
  }
  return -1
}

sectors
  .toReversed()
  .filter(sector => sector.isInitiallyUsed)
  .forEach(currentSector => {
    const freePlaceIdx = findFreePlaceIndexForSector(currentSector)
    if (freePlaceIdx === -1) {
      return
    }
    // Move blocks from current sector to sector with enough free space
    const sectorToMoveTo = sectors[freePlaceIdx]
    const beforeLength = sectorToMoveTo.blocks.length
    sectorToMoveTo.blocks = sectorToMoveTo.blocks.filter(block => block !== '_').concat(currentSector.blocks)
    // Fill the rest with blanks if needed
    if (sectorToMoveTo.blocks.length < beforeLength) {
      sectorToMoveTo.blocks = sectorToMoveTo.blocks.concat(Array(beforeLength - sectorToMoveTo.blocks.length).fill('_'))
    }
    currentSector.blocks = Array(currentSector.blocks.length).fill('_')
  })

const checksum = sectors
  .map(sector => sector.blocks)
  .flat()
  .map((char, index) => ({ char, index }))
  .filter(el => el.char !== '_')
  .reduce((sum, el) => sum + (Number(el.char) * el.index), 0)

console.log(checksum)

