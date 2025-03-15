import { designs, towels } from "./dataLoad";

function canBeSolved(design: string, blacklist: Set<string>) {
  if (blacklist.has(design)) return false
  
  if (towels.some(towel => towel == design)) return true

  const isSolved = towels.some(towel => {
    if (design.startsWith(towel)) {
      return canBeSolved(design.replace(towel, ''), blacklist)
    }
    return false
  })

  if (!isSolved) blacklist.add(design)
  return isSolved
}

const result = designs
  .map(design => canBeSolved(design, new Set<string>()))
  .reduce((sum, curr) => sum + Number(curr), 0)

console.log(result)