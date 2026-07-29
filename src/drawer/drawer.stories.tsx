import { useState } from "react";

import { Button } from "../button/button";
import { Drawer } from "./drawer";

export const DrawerStory = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="story-pad">
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title={<span>msg_01hf…</span>}>
        <p className="story-dim">Message detail body.</p>
      </Drawer>
    </div>
  );
};
