import { randomId } from "@excalidraw/common";
import { newElement } from "@excalidraw/element";

import type { ExcalidrawElement } from "@excalidraw/element/types";

export const DEFAULT_TABLE_CELL_SIZE = 120;
export const MAX_TABLE_ROWS = 10;
export const MAX_TABLE_COLS = 10;

const clampTableSize = (value: number, max: number) => {
  if (!Number.isFinite(value)) {
    return 1;
  }
  return Math.min(Math.max(Math.floor(value), 1), max);
};

export const buildTableElements = ({
  rows,
  cols,
  centerX,
  centerY,
  cellWidth = DEFAULT_TABLE_CELL_SIZE,
  cellHeight = DEFAULT_TABLE_CELL_SIZE,
}: {
  rows: number;
  cols: number;
  centerX: number;
  centerY: number;
  cellWidth?: number;
  cellHeight?: number;
}): {
  elements: ExcalidrawElement[];
  ids: string[];
} => {
  const normalizedRows = clampTableSize(rows, MAX_TABLE_ROWS);
  const normalizedCols = clampTableSize(cols, MAX_TABLE_COLS);

  const groupId = randomId();
  const startX = centerX - (normalizedCols * cellWidth) / 2;
  const startY = centerY - (normalizedRows * cellHeight) / 2;

  const elements: ExcalidrawElement[] = [];

  for (let row = 0; row < normalizedRows; row++) {
    for (let col = 0; col < normalizedCols; col++) {
      elements.push(
        newElement({
          type: "rectangle",
          x: startX + col * cellWidth,
          y: startY + row * cellHeight,
          width: cellWidth,
          height: cellHeight,
          groupIds: [groupId],
        }),
      );
    }
  }

  return {
    elements,
    ids: elements.map((element) => element.id),
  };
};
