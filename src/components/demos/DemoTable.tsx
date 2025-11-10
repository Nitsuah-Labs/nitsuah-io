import React, { CSSProperties, ReactNode } from "react";

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T, value: any) => ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
}

interface DemoTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  hover?: boolean;
  striped?: boolean;
  style?: CSSProperties;
}

export function DemoTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  hover = true,
  striped = false,
  style = {},
}: DemoTableProps<T>) {
  const [hoveredRow, setHoveredRow] = React.useState<number | null>(null);

  return (
    <div
      style={{
        overflowX: "auto",
        borderRadius: "8px",
        border: "2px solid rgba(255, 255, 255, 0.1)",
        ...style,
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.9rem",
        }}
      >
        <thead>
          <tr
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {columns.map((column, index) => (
              <th
                key={String(column.key) + index}
                style={{
                  padding: "1rem",
                  textAlign: column.align || "left",
                  fontWeight: "600",
                  color: "#fff",
                  width: column.width,
                }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick?.(item)}
              onMouseEnter={() => hover && setHoveredRow(rowIndex)}
              onMouseLeave={() => hover && setHoveredRow(null)}
              style={{
                background:
                  hoveredRow === rowIndex
                    ? "rgba(255, 255, 255, 0.1)"
                    : striped && rowIndex % 2 === 1
                      ? "rgba(255, 255, 255, 0.02)"
                      : "transparent",
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                cursor: onRowClick ? "pointer" : "default",
                transition: "background 0.2s ease",
              }}
            >
              {columns.map((column, colIndex) => {
                const value = item[column.key as keyof T];
                return (
                  <td
                    key={String(column.key) + colIndex}
                    style={{
                      padding: "1rem",
                      textAlign: column.align || "left",
                      color: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    {column.render ? column.render(item, value) : String(value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div
          style={{
            padding: "3rem",
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          No data available
        </div>
      )}
    </div>
  );
}
