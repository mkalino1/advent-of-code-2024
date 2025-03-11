import { program } from "./dataLoad";

let registerA: bigint = 0n
let registerB: bigint = 0n
let registerC: bigint = 0n

let instructionPointer: number = 0

function processIntruction(opcode: number, operand: number, output: number[]) {
  const literal = BigInt(operand)
  const combo = getComboOperand(literal)
  switch (opcode) {
    case 0:
      registerA = registerA / 2n ** combo
      break
    case 1:
      registerB = registerB ^ literal
      break
    case 2:
      registerB = combo % 8n
      break
    case 3:
      // Do nothing, because this version of machine goes backwards cycle after cycle
      // And jumping would mean going to next cycle
      break
    case 4:
      registerB = registerB ^ registerC
      break
    case 5:
      output.push(Number(combo % 8n))
      break
    case 6:
      registerB = registerA / 2n ** combo
      break
    case 7:
      registerC = registerA / 2n ** combo
      break
  }
  instructionPointer += 2
}

function getComboOperand(literal: bigint): bigint {
  switch (literal) {
    case 4n:
      return registerA
    case 5n:
      return registerB
    case 6n:
      return registerC
    default:
      return literal
  }
}

function solveOneCycle() {
  instructionPointer = 0
  registerB = 0n
  registerC = 0n
  const output: number[] = []
  while (instructionPointer < program.length - 1) {
    processIntruction(program[instructionPointer], program[instructionPointer + 1], output)
  }
  return output
}

// Program:
// 2,4 | registerB <- registerA % 8
// 1,3 | registerB <- registerB XOR 3
// 7,5 | registerC <- registerA / 2 ** registerB
// 4,1 | registerB <- registerB XOR registerC     | Doesn't matter
// 1,3 | registerB <- registerB XOR 3             | Doesn't matter
// 0,3 | registerA <- registerA / 8
// 5,5 | output(registerC % 8)
// 3,0 | jump to start

// Let's start from the end
// The only instruction in the program input that can modify registerA is (0,3), so registerA is divided by 8 every iteration
// Registers B and C are overrriden each cycle, so it doesn't matter what they are at the beggining of cycle
// We know that in last iteration registerA = 0 and it outputs 0
// So starting from that let's reverse engineer it cycle after cycle

function reverseEngineerRecursively(timeTravelA: bigint, iteration: number) {
  // For given register A find the "previous" A value by simlulating one cycle for each possible remainder
  const validRemainders: bigint[] = [0n, 1n, 2n, 3n, 4n, 5n, 6n, 7n].filter(remainder => {
    registerA = timeTravelA * 8n + remainder
    
    const output = solveOneCycle()
    
    // First iteration cannot have remainder 0, because it would stuck
    if (timeTravelA == 0n && remainder == 0n) return false

    if (iteration == 0 && output[0] == program[iteration]) {
      console.log('Result:', timeTravelA * 8n + remainder);
      
    }
    if (output[0] == program[iteration]) return true
  })

  validRemainders.forEach(remainder => reverseEngineerRecursively(timeTravelA * 8n + remainder, iteration - 1))
}

reverseEngineerRecursively(0n, program.length - 1)