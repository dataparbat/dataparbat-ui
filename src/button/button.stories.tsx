import { Button } from "./button";

export const Kinds = () => (
  <div className="story-pad story-row">
    <Button kind="primary">Send email</Button>
    <Button>Default</Button>
    <Button kind="danger">Delete</Button>
    <Button kind="ghost">Ghost</Button>
    <Button disabled>Disabled</Button>
  </div>
);
