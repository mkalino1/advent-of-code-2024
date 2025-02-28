import * as fs from "fs"

const rawData: string = fs.readFileSync("day-14/data", "utf8")
const rows: string[] = rawData.split(/\r?\n/)

const rowsOfNumbers = rows.filter(Boolean).map(row => row.match(/-?\d+/g)!.map(Number))

export { rowsOfNumbers }