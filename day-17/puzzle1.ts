import { program, registers } from "./dataLoad";

let registerA: number = registers[0]
let registerB: number = registers[1]
let registerC: number = registers[2]

let instructionPointer: number = 0

const output: number[] = []

function processIntruction(opcode: number, literal: number) {
  const combo = getComboOperand(literal)
  switch (opcode) {
    case 0:
      registerA = Math.floor(registerA / 2 ** combo)
      break
    case 1:
      registerB = registerB ^ literal
      break
    case 2:
      registerB = combo % 8
      break
    case 3:
      if (registerA != 0) instructionPointer = literal - 2
      break
    case 4:
      registerB = registerB ^ registerC
      break
    case 5:
      output.push(combo % 8)
      break
    case 6:
      registerB = Math.floor(registerA / 2 ** combo)
      break
    case 7:
      registerC = Math.floor(registerA / 2 ** combo)
      break
  }
  instructionPointer += 2
}

function getComboOperand(literal: number): number {
  switch (literal) {
    case 4:
      return registerA
    case 5:
      return registerB
    case 6:
      return registerC
    default:
      return literal
  }
}

while (instructionPointer < program.length - 1) {
  processIntruction(program[instructionPointer], program[instructionPointer + 1])
}

console.log(output.join(','))