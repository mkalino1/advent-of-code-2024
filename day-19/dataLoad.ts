import * as fs from "fs"

const rawData: string = fs.readFileSync("day-19/data", "utf8")
const rows: string[] = rawData.split(/\r?\n/)

const towels: string[] = rows[0].split(', ')
const designs: string[] = rows.slice(2)

export { towels, designs }