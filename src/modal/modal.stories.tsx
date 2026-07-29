import { useState } from "react";

import { Button } from "../button/button";
import { Modal } from "./modal";

export const ModalStory = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="story-pad">
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Confirm send">
        <p className="story-dim">This sends to 12,401 recipients.</p>
        <div className="story-end">
          <Button kind="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button kind="primary">Send</Button>
        </div>
      </Modal>
    </div>
  );
};
