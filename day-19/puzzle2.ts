import { designs, towels } from "./dataLoad";

const cache: Map<string, number> = new Map()

function countSolutions(design: string): number {
  if (design.length === 0) return 1

  if (cache.has(design)) {
    return cache.get(design) || 0
  }

  let count = 0;
  towels.forEach(towel => {
    if (design.startsWith(towel)) {
      count += countSolutions(design.replace(towel, ''))
    }
  })

  cache.set(design, count)

  return count
}

const result = designs
  .map(countSolutions)
  .reduce((sum, curr) => sum + curr)

console.log(result)