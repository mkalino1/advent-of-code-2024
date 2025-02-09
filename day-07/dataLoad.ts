import * as fs from "fs";

type Equation = {
  goal: number,
  numbers: number[]
}

const rawData: string = fs.readFileSync("day-07/data", "utf8");
const equations: Equation[] = rawData.split(/\r?\n/).map(
  (row) => {
    const [result, numbers] = row.split(": ")
    return {
      goal: Number(result),
      numbers: numbers.split(' ').map(Number)
    }
  }
);

export { equations };
