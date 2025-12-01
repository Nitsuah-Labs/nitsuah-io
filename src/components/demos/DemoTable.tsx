import { CSSProperties, ReactNode } from "react";
import styles from "./DemoTable.module.css";

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
  return (
    <div className={styles.wrapper} style={style}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {columns.map((column, index) => (
              <th
                key={String(column.key) + index}
                className={`${styles.th} ${styles[column.align || "left"]}`}
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => {
            const rowClasses = [
              styles.tr,
              onRowClick && styles.clickable,
              hover && styles.hoverable,
              striped && styles.striped,
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <tr
                key={rowIndex}
                className={rowClasses}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column, colIndex) => {
                  const value = item[column.key as keyof T];
                  return (
                    <td
                      key={String(column.key) + colIndex}
                      className={`${styles.td} ${styles[column.align || "left"]}`}
                    >
                      {column.render
                        ? column.render(item, value)
                        : String(value)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className={styles.empty}>No data available</div>
      )}
    </div>
  );
}
