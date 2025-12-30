import type { Arrow } from "./locales/vietnamese";
import { birthdayArrowMeaning } from "./MapDataLocales/birtdayArrowMeaning";
import type { Grid } from "@/components/details/birthdayChart"

type LineResult = {
  value: string;
  position: string;
};

const isNonEmpty = (v: unknown): v is string =>
  typeof v === "string" && v.trim() !== "";

const firstChar = (s: string) => s.trim()[0];

function collectWithPosition(grid: Grid & [][]) {
  const rows: LineResult[] = [];
  const columns: LineResult[] = [];
  const diagonals: LineResult[] = [];

  const rowLabels = ["topRow", "middleRow", "bottomRow"];
  const colLabels = ["startColumns", "centerColumns", "endColumn"];

  const rowCount = grid.length;
  const colCount = Math.max(...grid.map(r => r.length));

  // ---------- ROWS ----------
  for (let r = 0; r < rowCount; r++) {
    const row = grid[r];
    if (row && row.every(isNonEmpty)) {
      rows.push({
        value: row.map(firstChar).join(""),
        position: rowLabels[r] ?? `row${r}`,
      });
    }
  }

  // ---------- COLUMNS ----------
  for (let c = 0; c < colCount; c++) {
    const col: string[] = [];
    let ok = true;

    for (let r = 0; r < rowCount; r++) {
      const v = grid[r]?.[c];
      if (!isNonEmpty(v)) {
        ok = false;
        break;
      }
      col.push(v);
    }

    if (ok) {
      columns.push({
        value: col.map(firstChar).join(""),
        position: colLabels[c] ?? `column${c}`,
      });
    }
  }

  // ---------- START DIAGONAL (↘) ----------
  {
    const diag: string[] = [];
    let ok = true;

    for (let i = 0; i < Math.min(rowCount, colCount); i++) {
      const v = grid[i]?.[i];
      if (!isNonEmpty(v)) {
        ok = false;
        break;
      }
      diag.push(v);
    }

    if (ok) {
      diagonals.push({
        value: diag.map(firstChar).join(""),
        position: "startDiagonals",
      });
    }
  }

  // ---------- END DIAGONAL (↙) ----------
  {
    const diag: string[] = [];
    let ok = true;

    for (let i = 0; i < Math.min(rowCount, colCount); i++) {
      const v = grid[i]?.[colCount - 1 - i];
      if (!isNonEmpty(v)) {
        ok = false;
        break;
      }
      diag.push(v);
    }

    if (ok) {
      diagonals.push({
        value: diag.map(firstChar).join(""),
        position: "endDiagonals",
      });
    }
  }

  return { rows, columns, diagonals };
}

type Cell = string | null | undefined;

type LineKind = "row" | "column" | "diagonal";
type LineLabel =
  | "topRow"
  | "middleRow"
  | "bottomRow"
  | "startColumns"
  | "centerColumns"
  | "endColumn"
  | "startDiagonals"
  | "endDiagonals";

type EmptyLineResult = {
  position: LineLabel | string;
  value: string;
}

const isEmpty = (v: Cell) => v == null || String(v).trim() === "";

/**
 * Order QUAN TRỌNG để khớp label bạn đưa:
 * - Rows: left -> right (top/middle/bottom) => 369, 258, 147
 * - Columns: bottom -> top (start/center/end) => 123, 456, 789
 * - Diagonals:
 *   - startDiagonals: bottom-left -> top-right => 159
 *   - endDiagonals: top-left -> bottom-right => 357
 */
function labelFor3x3(kind: LineKind, index: number): LineLabel | string {
  if (kind === "row") return (["topRow", "middleRow", "bottomRow"][index] ?? `row${index}`) as any;
  if (kind === "column") return (["startColumns", "centerColumns", "endColumn"][index] ?? `col${index}`) as any;
  // diagonal
  return (["startDiagonals", "endDiagonals"][index] ?? `diag${index}`) as any;
}

/**
 * Hàm RIÊNG: check line nào "toàn rỗng" => trả về chuỗi theo grid default:
 * Rows: 369 / 258 / 147
 * Cols: 123 / 456 / 789
 * Diags: 159 / 357
 */
function getEmptyLinesByDefaultGrid(grid: Cell[][]): EmptyLineResult[] {
  const n = grid.length;
  if (!n || grid.some(r => r.length !== n)) {
    throw new Error("Grid phải là ma trận vuông NxN (ví dụ 3x3).");
  }
  if (n !== 3) {
    // bạn có thể mở rộng default mapping cho NxN nếu cần
    throw new Error("Hàm này hiện map default theo 3x3 (grid [369;258;147]).");
  }

  const defaultGrid = [
    ["3", "6", "9"],
    ["2", "5", "8"],
    ["1", "4", "7"],
  ] as const;

  const out: EmptyLineResult[] = [];

  // Rows (left->right)
  for (let r = 0; r < 3; r++) {
    const coords = [0, 1, 2].map(c => ({ r, c, cell: grid[r][c] }));
    if (coords.every(p => isEmpty(p.cell))) {
      out.push({
        position: labelFor3x3("row", r),
        value: defaultGrid[r].join(""), // 369/258/147
      });
    }
  }

  // Columns (bottom->top) => 123/456/789
  for (let c = 0; c < 3; c++) {
    const coords = [2, 1, 0].map(r => ({ r, c, cell: grid[r][c] }));
    if (coords.every(p => isEmpty(p.cell))) {
      const value = [defaultGrid[0][c], defaultGrid[1][c], defaultGrid[2][c]].join("");
      out.push({
        position: labelFor3x3("column", c),
        value,
      });
    }
  }

  // startDiagonals: bottom-left -> top-right => 159
  {
    const coords = [
      { r: 2, c: 0, cell: grid[2][0] },
      { r: 1, c: 1, cell: grid[1][1] },
      { r: 0, c: 2, cell: grid[0][2] },
    ];
    if (coords.every(p => isEmpty(p.cell))) {
      const value = [defaultGrid[2][0], defaultGrid[1][1], defaultGrid[0][2]].join(""); // 159
      out.push({
        position: "startDiagonals",
        value,
      });
    }
  }

  // endDiagonals: top-left -> bottom-right => 357
  {
    const coords = [
      { r: 0, c: 0, cell: grid[0][0] },
      { r: 1, c: 1, cell: grid[1][1] },
      { r: 2, c: 2, cell: grid[2][2] },
    ];
    if (coords.every(p => isEmpty(p.cell))) {
      const value = [defaultGrid[0][0], defaultGrid[1][1], defaultGrid[2][2]].join(""); // 357
      out.push({
        position: "endDiagonals",
        value,
      });
    }
  }

  return out;
}

const getArrowMeaningByArrow = (arrows: string[], localeMap: Map<string, Arrow>): Arrow[]=> {
    const arrowMeanings = [] as Arrow[]
    arrows.forEach((arrow) => {
        arrowMeanings.push(localeMap.get(arrow) as Arrow)
    })
    return arrowMeanings
}

type GetBirthdayArrowMeaningType = {
    arrowMeaningMapping: Arrow[]
    positions: string[]
}

export function getBirthdayArrowMeaning(locale: string, grid: Grid & [][]): GetBirthdayArrowMeaningType | null {
    const localeMap = birthdayArrowMeaning.get(locale);
    if (!localeMap) {
        return null;
    }
    const chartDataNotNull = [] as string[]
    const chartDataPositions = [] as string[]
    const chartDataNull = [] as string[]
    
    const data = collectWithPosition(grid)
    const fallingData = getEmptyLinesByDefaultGrid(grid)

    data.rows.forEach((item) => {
        chartDataNotNull.push(item.value)
        chartDataPositions.push(item.position)
    })
    data.columns.forEach((item) => {
        chartDataNotNull.push(item.value)
        chartDataPositions.push(item.position)
    })
    data.diagonals.forEach((item) => {
        chartDataNotNull.push(item.value)
        chartDataPositions.push(item.position)
    })

    fallingData.forEach((item) => {
        chartDataNull.push(item.value)
        chartDataPositions.push(item.position)
    })

    const arrowMeaningMapping = getArrowMeaningByArrow(chartDataNotNull, localeMap.arrow_having_chart_map)
    const arrowFallingMeaningMapping = getArrowMeaningByArrow(chartDataNull, localeMap.arrow_have_not_chart_map)
    
    const result = {
        arrowMeaningMapping: [...arrowMeaningMapping, ...arrowFallingMeaningMapping],
        positions: chartDataPositions
    }

    return result || null;
}