import { Dialog } from "@excalidraw/excalidraw/components/Dialog";
import { useState } from "react";

import { MAX_TABLE_COLS, MAX_TABLE_ROWS } from "../utils/buildTableElements";

const DEFAULT_ROWS = 3;
const DEFAULT_COLS = 3;

export const TableInsertDialog = ({
  onClose,
  onInsert,
}: {
  onClose: () => void;
  onInsert: (rows: number, cols: number) => void;
}) => {
  const [hovered, setHovered] = useState<{
    rows: number;
    cols: number;
  } | null>(null);

  const rows = hovered?.rows ?? DEFAULT_ROWS;
  const cols = hovered?.cols ?? DEFAULT_COLS;

  const cells = [];
  for (let row = 1; row <= MAX_TABLE_ROWS; row++) {
    for (let col = 1; col <= MAX_TABLE_COLS; col++) {
      const isSelected = row <= rows && col <= cols;
      cells.push(
        <button
          key={`${row}-${col}`}
          type="button"
          aria-label={`${row} x ${col} table`}
          onMouseEnter={() => setHovered({ rows: row, cols: col })}
          onFocus={() => setHovered({ rows: row, cols: col })}
          onClick={() => onInsert(row, col)}
          style={{
            width: 20,
            height: 20,
            padding: 0,
            cursor: "pointer",
            borderRadius: 4,
            border: "1px solid var(--color-gray-40, #b8b8b8)",
            backgroundColor: isSelected
              ? "var(--color-primary, #6965db)"
              : "transparent",
          }}
        />,
      );
    }
  }

  return (
    <Dialog
      size="small"
      onCloseRequest={onClose}
      title="Insert table"
      className="TableInsertDialog"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${MAX_TABLE_COLS}, 20px)`,
            gap: 4,
          }}
          onMouseLeave={() => setHovered(null)}
        >
          {cells}
        </div>
        <div style={{ fontSize: 14 }}>
          {rows} x {cols}
        </div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>
          Tip: double-click a cell to add text.
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="button" onClick={() => onInsert(rows, cols)}>
            Insert
          </button>
        </div>
      </div>
    </Dialog>
  );
};
