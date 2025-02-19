import { inputNumbers } from "./dataLoad"

const totalIterations = 25

let stones = inputNumbers

function transformStone(stone: number): number | number[] {
  if (stone == 0) return 1

  const engravementLength = String(stone).length
  if (engravementLength % 2 == 0) {
    return [
      String(stone).slice(0, engravementLength / 2),
      String(stone).slice(engravementLength / 2),
    ].map(Number)
  }
  return stone * 2024
}

Array.from({ length: totalIterations }).forEach(_ => {
  stones = stones.flatMap(transformStone)
})

console.log(stones.length);