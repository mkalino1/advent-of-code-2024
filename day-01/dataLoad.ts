import * as fs from "fs";
import { zip } from "lodash";

const rawData: string = fs.readFileSync("day-01/data", "utf8");
const pairs: number[][] = rawData
  .split(/\r?\n/)
  .map((row) => row.split(/\s/).filter(Boolean).map(Number));
const columns: number[][] = zip(...pairs);

export default columns;
