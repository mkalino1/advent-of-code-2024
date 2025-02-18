import * as fs from "fs"

const rawData: string = fs.readFileSync("day-11/data", "utf8")
const inputNumbers: number[] = rawData.split(' ').map(Number)

export { inputNumbers }
