import * as fs from "fs";

const rawData: string = fs.readFileSync("day-06/data", "utf8");
const rows: string[][] = rawData.split(/\r?\n/).map((row) => row.split(""));
// Zero based
const maxY = rows.length - 1;
const maxX = rows[0].length - 1;

export { rows, maxY, maxX };
