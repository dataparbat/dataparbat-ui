import { useState } from "react";

import { Button } from "../button/button";
import { Modal } from "./modal";

export const ModalStory = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Confirm send">
        <p className="text-[13px] text-ink-2">This sends to 12,401 recipients.</p>
        <div className="flex justify-end gap-2">
          <Button kind="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button kind="primary">Send</Button>
        </div>
      </Modal>
    </div>
  );
};
