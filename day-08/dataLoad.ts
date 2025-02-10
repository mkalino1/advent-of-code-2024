import * as fs from "fs";

type Point = {
  x: number,
  y: number
}

const rawData: string = fs.readFileSync("day-08/data", "utf8")
const rows: string[] = rawData.split(/\r?\n/)

const antennasLocations = new Map<string, Point[]>()
rows.forEach((row, yIndex) => {
  row.split('').forEach((point, xIndex) => {
    if (point === '.') {
      return
    }
    if (antennasLocations.has(point)) {
      antennasLocations.get(point)?.push({x: xIndex, y: yIndex})
    } else {
      antennasLocations.set(point, [{x: xIndex, y: yIndex}])
    }
  })
});

const maxXIndex = rows[0].length - 1
const maxYIndex = rows.length - 1

export { antennasLocations, maxXIndex, maxYIndex, Point };
