import * as fs from "fs"

const rawData: string = fs.readFileSync("day-15/data", "utf8")
const rows: string[] = rawData.split(/\r?\n/)

const indexOfSeparator = rows.findIndex(row => !Boolean(row))

const board: string[][] = rows.slice(0, indexOfSeparator).map(row => row.split(''))

const instructions: string[] = rows.slice(indexOfSeparator + 1).join('').split('')

export { board, instructions }