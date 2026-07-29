import { useRef, useState } from "react";

import { useClickOutside } from "../hooks/use-click-outside";
import { useEscape } from "../hooks/use-escape";
import type { ChromeLabels, ChromeWorkspace } from "./types";

/* K5 — one control for org and workspace. Presentational: switching and
   the new-workspace ACTION are callbacks (the console opens its modal; a
   product SPA navigates to the console). State copy arrives as labels. */

export function OrgSwitcher({
  workspaces,
  currentSlug,
  labels,
  onSwitch,
  onNewWorkspace,
}: {
  workspaces: ChromeWorkspace[];
  currentSlug: string;
  labels: ChromeLabels;
  onSwitch: (slug: string) => void;
  onNewWorkspace: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, open, () => setOpen(false));
  useEscape(open, () => setOpen(false));

  const current = workspaces.find((workspace) => workspace.slug === currentSlug);

  return (
    <div className="dp-psw-wrap" ref={ref}>
      <button
        type="button"
        className="dp-osw"
        aria-expanded={open}
        aria-label={labels.switchOrg}
        onClick={() => setOpen(!open)}
      >
        org: <b>{current?.slug ?? currentSlug}</b>
        <span className="dp-caret" aria-hidden>
          ▾
        </span>
      </button>
      {open && (
        <div role="menu" aria-label={labels.switchOrg} className="dp-shellpop dp-narrow">
          {workspaces.map((workspace) => (
            <button
              key={workspace.slug}
              type="button"
              role="menuitem"
              className="dp-mi"
              aria-current={workspace.slug === currentSlug || undefined}
              onClick={() => {
                setOpen(false);
                onSwitch(workspace.slug);
              }}
            >
              <span>
                <span className="dp-mt">{workspace.name}</span>
                <span className="dp-ms">
                  {workspace.slug} · {workspace.role} · {stateLine(workspace, labels)}
                </span>
              </span>
            </button>
          ))}
          <hr />
          <button
            type="button"
            role="menuitem"
            className="dp-mi"
            onClick={() => {
              setOpen(false);
              onNewWorkspace();
            }}
          >
            <span className="dp-mt">{labels.newWorkspace}</span>
          </button>
        </div>
      )}
    </div>
  );
}

function stateLine(workspace: ChromeWorkspace, labels: ChromeLabels): string {
  if (workspace.purge_at) return labels.workspaceDeleting;

  switch (workspace.send_block_reason) {
    case null:
      return labels.workspaceLive;
    case "sending_paused":
      return labels.workspacePaused;
    case "pending_review":
      return labels.workspaceReview;
    case "account_suspended":
      return labels.workspaceSuspended;
    default:
      return workspace.status;
  }
}
