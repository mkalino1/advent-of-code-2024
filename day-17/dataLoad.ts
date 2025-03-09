import * as fs from "fs"

const rawData: string = fs.readFileSync("day-17/data", "utf8")
const rows: string[] = rawData.split(/\r?\n/)

const indexOfSeparator = rows.findIndex(row => !Boolean(row))

const registers: number[] = rows.slice(0, indexOfSeparator).flatMap(row => row.match(/-?\d+/g)!.map(Number))

const program: number[] = rows[indexOfSeparator + 1].match(/-?\d+/g)!.map(Number)

export { registers, program }