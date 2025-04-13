import * as fs from "fs"

const rawData: string = fs.readFileSync("day-20/data", "utf8")
const rows: string[] = rawData.split(/\r?\n/)
const inputMatrix: string[][] = rows.map(row => row.split(''))

export { inputMatrix }