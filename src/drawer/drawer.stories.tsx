import { useState } from "react";

import { Button } from "../button/button";
import { Drawer } from "./drawer";

export const DrawerStory = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title={<span>msg_01hf…</span>}>
        <p className="text-[13px] text-ink-2">Message detail body.</p>
      </Drawer>
    </div>
  );
};
