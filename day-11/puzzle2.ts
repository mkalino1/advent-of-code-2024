import { inputNumbers } from "./dataLoad";

const totalIterations = 75
const stones = inputNumbers
const cache = new Map<number, Map<number, number>>()

function transformStone(stone: number): number[] {
  if (stone == 0) return [1]
  
  const engravementLength = String(stone).length
  if (engravementLength % 2 == 0) {
    return [
      String(stone).slice(0, engravementLength / 2),
      String(stone).slice(engravementLength / 2),
    ].map(Number)
  }
  return [stone * 2024]
}

function solveRecursively(currentStone: number, iterationsLeft: number): number {
  if (iterationsLeft == 0) return 1

  // If already computed in past skip calculation
  if (cache.has(currentStone) && cache.get(currentStone)!.has(iterationsLeft)) {
    return cache.get(currentStone)!.get(iterationsLeft) as number
  }

  return transformStone(currentStone)
    .map(newStone => {
      const result = solveRecursively(newStone, iterationsLeft - 1)
      putResultInCache(result, newStone, iterationsLeft - 1)
      return result
    })
    .reduce((sum, curr) => sum + curr)
}

function putResultInCache(result: number, engravement: number, iterationsLeft: number) {
  if (!cache.has(engravement)) {
    cache.set(engravement, new Map())
  }
  cache.get(engravement)!.set(iterationsLeft, result)
}

const resultLength = stones
  .map(stone => solveRecursively(stone, totalIterations))
  .reduce((sum, curr) => sum + curr)

console.log(resultLength)