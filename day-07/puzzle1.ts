import { equations } from "./dataLoad"

function isEquationSolvable(goal: number, numbers: number[], current: number) {
  if (current === goal) {
    return true
  }
  if (numbers.length === 0 || current > goal) {
    return false
  }

  // Check recursively for each operator
  if (isEquationSolvable(goal, numbers.slice(1), current + numbers[0])) {
    return true
  }
  if (isEquationSolvable(goal, numbers.slice(1), current * numbers[0])) {
    return true
  }
  return false
}

const solution = equations
  .filter(equation => isEquationSolvable(equation.goal, equation.numbers.slice(1), equation.numbers[0]))
  .reduce((sum, equation) => sum + equation.goal, 0)

console.log(solution)
