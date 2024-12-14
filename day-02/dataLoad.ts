import * as fs from "fs";

const rawData: string = fs.readFileSync("day-02/data", "utf8");
const rows: number[][] = rawData
  .split(/\r?\n/)
  .map((row) => row.split(/\s/).filter(Boolean).map(Number));

export default rows;
