import * as fs from "fs"

const rawData: string = fs.readFileSync("day-18/data", "utf8")
const rows: string[] = rawData.split(/\r?\n/)
const coordinates: number[][] = rows.map(row => row.split(',').map(Number))

export { coordinates }