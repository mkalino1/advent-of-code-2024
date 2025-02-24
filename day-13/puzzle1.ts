import { rowsOfNumbers } from "./dataLoad"

const OverGoalException = {}

type Vector = {
  x: number,
  y: number
}

type Machine = {
  buttonA: Vector,
  buttonB: Vector,
  goal: Vector
  solution: number
}

const machines: Machine[] = Array.from({ length: rowsOfNumbers.length / 3 })
  .map((_, i) => rowsOfNumbers.slice(i * 3, (i + 1) * 3))
  .map(machine => ({
    buttonA: { x: machine[0][0], y: machine[0][1] },
    buttonB: { x: machine[1][0], y: machine[1][1] },
    goal: { x: machine[2][0], y: machine[2][1] },
    solution: 0
  }))

function solveMachine(m: Machine) {
  const maxBClicks = Math.min(100, Math.floor(m.goal.x / m.buttonB.x), Math.floor(m.goal.y / m.buttonB.y))

  Array.from({ length: maxBClicks })
    .map((_, i) => i)
    .reverse()
    .forEach(clicksB => {
      if (m.solution == 0) {
        solveForFixedClicksB(m, clicksB)
      }
    })
}

function solveForFixedClicksB(m: Machine, clicksB: number) {
  try {
    Array.from({ length: 100 }).forEach((_, clicksA) => checkIfSolvable(m, clicksA, clicksB))
  } catch (e) {}
}

function checkIfSolvable(m: Machine, clicksA: number, clicksB: number) {
  const currentX = m.buttonA.x * clicksA + m.buttonB.x * clicksB
  const currentY = m.buttonA.y * clicksA + m.buttonB.y * clicksB

  if (currentX == m.goal.x && currentY == m.goal.y) {
    m.solution = clicksB + clicksA * 3
  }
  if (currentX > m.goal.x || currentY > m.goal.y) {
    throw OverGoalException
  }
}

machines.forEach(solveMachine)

const result = machines
  .map(machine => machine.solution)
  .reduce((sum, curr) => sum + curr)

console.log(result)
