import * as fs from "fs"

const rawData: string = fs.readFileSync("day-10/data", "utf8")
const rows: string[] = rawData.split(/\r?\n/)
const heights: number[][] = rows.map(row => row.split('').map(Number))

export { heights }
