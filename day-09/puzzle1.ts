import { inputNumbers } from "./dataLoad";

type Sector = {
  blocks: string[],
  readonly isInitiallyUsed: boolean
}

// Prepare array of sectors
const sectors: Sector[] = []
inputNumbers.map((number, index) => {
  if (index % 2 == 0) {
    sectors.push({
      blocks: Array(number).fill(String(index / 2)),
      isInitiallyUsed: true
    })
  } else {
    sectors.push({
      blocks: Array(number).fill('_'),
      isInitiallyUsed: false
    })
  }
})

// Find indexes of rightmost used and leftmost free sectors
let rightUsedIdx = sectors.findLastIndex(sector => sector.isInitiallyUsed)
let leftFreeIdx = 1

function isLeftFreeFull() {
  return !sectors[leftFreeIdx].blocks.includes('_')
}

function isRightUsedEmpty() {
  return sectors[rightUsedIdx].blocks.length === 0
}

while (leftFreeIdx < rightUsedIdx) {
  if (isLeftFreeFull()) {
    leftFreeIdx += 2
    continue
  }
  if (isRightUsedEmpty()) {
    rightUsedIdx -= 2
    continue
  }
  // Replace first _ with last block from rightmost used sector
  const indexOfFirstBlank = sectors[leftFreeIdx].blocks.indexOf('_')
  sectors[leftFreeIdx].blocks[indexOfFirstBlank] = sectors[rightUsedIdx].blocks.pop() as string
}

const checksum = sectors
  .slice(0, rightUsedIdx + 1)
  .flatMap(sector => sector.blocks)
  .map((el, i) => Number(el) * i)
  .reduce((sum, el) => sum + el)

console.log(checksum)

