import { rowsOfNumbers } from "./dataLoad"

type Vector = {
  x: number,
  y: number
}

type Machine = {
  buttonA: Vector,
  buttonB: Vector,
  goal: Vector
}

const machines: Machine[] = Array.from({ length: rowsOfNumbers.length / 3 })
  .map((_, i) => rowsOfNumbers.slice(i * 3, (i + 1) * 3))
  .map(machine => ({
    buttonA: { x: machine[0][0], y: machine[0][1] },
    buttonB: { x: machine[1][0], y: machine[1][1] },
    goal: { x: machine[2][0] + 10000000000000, y: machine[2][1] + 10000000000000 }
  }))

function solveMachine(m: Machine) {
  // Solve system of two equations using math
  const clicksB = (m.goal.x * m.buttonA.y - m.goal.y * m.buttonA.x) / (m.buttonB.x * m.buttonA.y - m.buttonB.y * m.buttonA.x)
  const clicksA = (m.goal.y - clicksB * m.buttonB.y) / m.buttonA.y
  if (Number.isInteger(clicksB) && Number.isInteger(clicksA)) {
    return clicksB + clicksA * 3
  }
  return 0
}

const result = machines
  .map(solveMachine)
  .reduce((sum, curr) => sum + curr)

console.log(result)
