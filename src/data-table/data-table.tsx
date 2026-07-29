import type { ReactNode } from "react";

import { cx } from "../cx";

/* The data table — THE brand surface. Typed columns with ROLES (the same
   logical column is the same width on every screen), controlled sort with
   its direction always shown, quiet hover, ruled selection, keyboard rows.
   The four-state rule composes OUTSIDE: render TableSkeleton / ErrorState /
   EmptyState / DataTable — exactly one. */

export type ColumnRole = "name" | "sub" | "id" | "status" | "kind" | "time" | "num" | "act";

export type SortDirection = "ascending" | "descending";

export type Column<Row> = {
  id: string;
  header: ReactNode;
  cell: (row: Row) => ReactNode;
  role?: ColumnRole;
  sortable?: boolean;
};

export type Sort = { columnId: string; direction: SortDirection };

export function DataTable<Row>({
  columns,
  rows,
  rowKey,
  sort,
  onSortChange,
  selectedKey,
  onRowActivate,
  rowTone,
  label,
}: {
  columns: Column<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  sort?: Sort;
  onSortChange?: (sort: Sort) => void;
  selectedKey?: string;
  onRowActivate?: (row: Row) => void;
  rowTone?: (row: Row) => "warn" | "crit" | undefined;
  label: string;
}) {
  const cycle = (columnId: string): Sort => {
    if (sort?.columnId !== columnId) return { columnId, direction: "ascending" };

    return {
      columnId,
      direction: sort.direction === "ascending" ? "descending" : "ascending",
    };
  };

  return (
    <table className="dp-table" aria-label={label}>
      <thead>
        <tr>
          {columns.map((column) => {
            const sorted = sort?.columnId === column.id ? sort.direction : undefined;

            if (!column.sortable || !onSortChange) {
              return (
                <th key={column.id} className={roleClass(column.role)} aria-sort={sorted}>
                  {column.header}
                  {sorted && <span className="dp-sarr" aria-hidden />}
                </th>
              );
            }

            return (
              <th
                key={column.id}
                className={cx("dp-sortable", roleClass(column.role))}
                aria-sort={sorted}
              >
                <button type="button" onClick={() => onSortChange(cycle(column.id))}>
                  {column.header}
                  <span className="dp-sarr" aria-hidden />
                </button>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const key = rowKey(row);
          const tone = rowTone?.(row);
          const interactive = Boolean(onRowActivate);

          return (
            <tr
              key={key}
              className={cx(
                interactive && "dp-nav",
                tone === "warn" && "dp-warnrow",
                tone === "crit" && "dp-critrow",
              )}
              aria-selected={selectedKey === undefined ? undefined : selectedKey === key}
              tabIndex={interactive ? 0 : undefined}
              onClick={interactive ? () => onRowActivate?.(row) : undefined}
              onKeyDown={
                interactive
                  ? (event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onRowActivate?.(row);
                      }
                    }
                  : undefined
              }
            >
              {columns.map((column) => (
                <td key={column.id} className={roleClass(column.role)}>
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function roleClass(role?: ColumnRole) {
  return role ? `dp-c-${role}` : undefined;
}

/* the framed container + head the canvases wrap every table in */
export function TableFrame({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("dp-frame", className)}>{children}</div>;
}

export function TableFrameHead({ children }: { children: ReactNode }) {
  return <div className="dp-frame-head">{children}</div>;
}

/* the honest footer: a real count, cursor paging — never fake page numbers */
export function TableFooter({ count, children }: { count: ReactNode; children?: ReactNode }) {
  return (
    <div className="dp-tfoot">
      <span className="dp-count">{count}</span>
      {children}
    </div>
  );
}

/* one voice for an absent value */
export function Nil({ label = "—" }: { label?: string }) {
  return <span className="dp-nil">{label}</span>;
}

/* a secondary fact on the row's one line — never a boxed badge in a cell */
export function Sfx({ children }: { children: ReactNode }) {
  return <span className="dp-sfx">{children}</span>;
}
