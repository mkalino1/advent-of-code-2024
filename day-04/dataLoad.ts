import * as fs from "fs";

const zip = (...rows: string[][]) => {
  return rows.map((_, j) => rows[0].map((_, i) => rows[i][j]));
};

const rawData: string = fs.readFileSync("day-04/data", "utf8");

const rows: string[] = rawData.split(/\r?\n/);
const rowsAs2DArray: string[][] = rows.map((row: string) => row.split(""));
const columns: string[] = zip(...rowsAs2DArray).map((el) => el.join(""));

// Generates diagonals for top right half of matrix
// Or bottom left if otherHalf = true
const generateHalfDiagonals = (rows: string[], otherHalf = false) => {
  return rows.map((_, i) =>
    rows
      .map(
        (_, j) => rows[j + i * Number(otherHalf)]?.[j + i * Number(!otherHalf)]
      )
      .filter(Boolean)
      .join("")
  );
};

const generateDiagonals = (rows: string[]) => {
  const diagonals: string[] = [
    ...generateHalfDiagonals(rows),
    ...generateHalfDiagonals(rows, true),
  ];
  //Remove the duplicated main diagonal
  diagonals.shift();
  return diagonals;
};

const diagonalsBackslash = generateDiagonals(rows);
const diagonalsSlash = generateDiagonals(
  rows.map((el) => el.split("").reverse().join(""))
);

export { rows, rowsAs2DArray, columns, diagonalsBackslash, diagonalsSlash };
