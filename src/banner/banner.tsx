import type { ReactNode } from "react";

import { cx } from "../cx";

export function Banner({
  children,
  tone,
}: {
  children: ReactNode;
  tone?: "warn";
}) {
  return (
    <div role={tone === "warn" ? "alert" : "note"} className={cx("dp-banner", tone && `dp-${tone}`)}>
      {children}
    </div>
  );
}
