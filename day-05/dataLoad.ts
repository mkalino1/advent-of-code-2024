import * as fs from "fs";

const rawData: string = fs.readFileSync("day-05/data", "utf8");

const sections: string[] = rawData.split(/\n\s*\n/);

const rules: number[][] = sections[0]
  .split(/\r?\n/)
  .map((el) => el.split("|").map(Number));
const updates: number[][] = sections[1]
  .split(/\r?\n/)
  .map((el) => el.split(",").map(Number));

export { rules, updates };
