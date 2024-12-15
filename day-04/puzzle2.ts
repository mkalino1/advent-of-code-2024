import { rowsAs2DArray } from "../day-04/dataLoad";

const neighboursOffsets = [
  [-1, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
];

const haveValidNeighbours = (i: number, j: number): boolean => {
  const neighbours = neighboursOffsets.map(
    ([offsetX, offsetY]) => rowsAs2DArray[i + offsetX]?.[j + offsetY]
  );

  if (neighbours.at(0) === neighbours.at(-1)) return false;

  const neighboursFrequency: Map<string, number> = neighbours.reduce(
    (frequencyMap, curr) =>
      frequencyMap.set(
        curr,
        frequencyMap.get(curr) ? frequencyMap.get(curr) + 1 : 1
      ),
    new Map()
  );

  return neighboursFrequency.get("M") === 2 && neighboursFrequency.get("S") === 2;
};

let sum = 0;

rowsAs2DArray.forEach((_, i) =>
  rowsAs2DArray.forEach((_, j) => {
    if (rowsAs2DArray[i][j] === "A") {
      sum += Number(haveValidNeighbours(i, j));
    }
  })
);

console.log(sum);
