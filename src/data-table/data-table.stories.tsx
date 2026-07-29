import { useMemo, useState } from "react";

import { StatusBadge } from "../status-badge/status-badge";
import { Skeleton, TableSkeleton } from "../skeleton/skeleton";
import { EmptyState } from "../empty-state/empty-state";
import { Button } from "../button/button";
import {
  DataTable,
  Nil,
  Sfx,
  TableFooter,
  TableFrame,
  TableFrameHead,
  type Column,
  type Sort,
} from "./data-table";
import {
  FilterToken,
  MenuDivider,
  MenuItem,
  OverflowMenu,
  SearchBox,
  TableToolbar,
  ToolbarSpacer,
} from "./table-toolbar";

type Message = {
  id: string;
  recipient: string;
  subject: string;
  status: string;
  mode: "live" | "test";
  sentAt: string;
  opens: number | null;
};

const MESSAGES: Message[] = [
  { id: "msg_2b7Kq9tXfLpN", recipient: "ada@northcraft.dev", subject: "Your export is ready", status: "delivered", mode: "live", sentAt: "14:32", opens: 3 },
  { id: "msg_8cRw2mPdQvXs", recipient: "sam@acme.com", subject: "Password reset", status: "delivered", mode: "live", sentAt: "14:29", opens: 1 },
  { id: "msg_5tYu3nKfWzAq", recipient: "kit@rival.io", subject: "Invoice #2291", status: "bounced", mode: "live", sentAt: "14:21", opens: null },
  { id: "msg_9dEr4bLgVcMn", recipient: "dev@sandbox.test", subject: "Welcome aboard", status: "queued", mode: "test", sentAt: "14:18", opens: null },
  { id: "msg_1aWq8sJhUxZo", recipient: "ops@northcraft.dev", subject: "Weekly digest", status: "suppressed", mode: "live", sentAt: "13:55", opens: null },
];

const COLUMNS: Column<Message>[] = [
  {
    id: "recipient",
    header: "recipient",
    role: "name",
    sortable: true,
    cell: (m) => (
      <>
        {m.recipient}
        {m.mode === "test" && <Sfx>test</Sfx>}
      </>
    ),
  },
  { id: "subject", header: "subject", role: "sub", cell: (m) => m.subject },
  { id: "status", header: "status", role: "status", sortable: true, cell: (m) => <StatusBadge value={m.status} /> },
  { id: "id", header: "message-id", role: "id", cell: (m) => <span className="data">{m.id}</span> },
  { id: "opens", header: "opens", role: "num", cell: (m) => (m.opens === null ? <Nil /> : m.opens) },
  { id: "sentAt", header: "sent", role: "time", sortable: true, cell: (m) => m.sentAt },
];

export const FullComposition = () => {
  const [query, setQuery] = useState("");
  const [testOnly, setTestOnly] = useState(true);
  const [sort, setSort] = useState<Sort>({ columnId: "sentAt", direction: "descending" });
  const [selected, setSelected] = useState<string | undefined>();

  const rows = useMemo(() => {
    let out = MESSAGES.filter(
      (m) => m.recipient.includes(query) || m.subject.toLowerCase().includes(query.toLowerCase()),
    );
    if (testOnly) out = out.filter((m) => m.mode === "test" || m.mode === "live");
    const dir = sort.direction === "ascending" ? 1 : -1;
    return [...out].sort((a, b) => {
      const key = sort.columnId as keyof Message;
      return String(a[key]).localeCompare(String(b[key])) * dir;
    });
  }, [query, testOnly, sort]);

  return (
    <div className="story-pad">
      <TableFrame>
        <TableFrameHead>
          <span className="dp-wire">
            viewing: <b>live</b> · rows: 12,847
          </span>
          <span className="dp-kbd">⌘K</span>
        </TableFrameHead>
        <TableToolbar>
          <SearchBox
            value={query}
            onChange={setQuery}
            placeholder="Search recipient or subject"
            label="Search messages"
          />
          <Button kind="default" className="dp-sm">
            Filter
          </Button>
          {testOnly && (
            <FilterToken
              k="mode"
              v="test"
              tone="warn"
              onRemove={() => setTestOnly(false)}
              removeLabel="Remove mode filter"
            />
          )}
          <ToolbarSpacer />
          <OverflowMenu label="Table options">
            <MenuItem shortcut="⌘E">Export view</MenuItem>
            <MenuItem>Column settings</MenuItem>
            <MenuDivider />
            <MenuItem tone="crit">Clear all filters</MenuItem>
          </OverflowMenu>
        </TableToolbar>
        <DataTable
          columns={COLUMNS}
          rows={rows}
          rowKey={(m) => m.id}
          sort={sort}
          onSortChange={setSort}
          selectedKey={selected}
          onRowActivate={(m) => setSelected(m.id)}
          rowTone={(m) =>
            m.status === "bounced" ? "crit" : m.status === "suppressed" ? "warn" : undefined
          }
          label="Messages"
        />
        <TableFooter count={`${rows.length} of 12,847`}>
          <Button kind="ghost" className="dp-sm">
            Load more
          </Button>
        </TableFooter>
      </TableFrame>
    </div>
  );
};

export const FourStates = () => (
  <div className="story-pad story-stack">
    <TableFrame>
      <TableSkeleton cols={4} loadingLabel="Loading messages" />
    </TableFrame>
    <TableFrame>
      <EmptyState
        title="No messages yet"
        hint="Send your first email and it will land here with its full delivery trace."
        action={<Button kind="primary">Send a test email</Button>}
        fine="POST /v1/emails · docs.dataparbat.example/quickstart"
      />
    </TableFrame>
    <Skeleton className="dp-skel-line story-w-md" />
  </div>
);
