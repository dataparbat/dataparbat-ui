import { Input } from "./input";

export const States = () => (
  <div className="story-pad story-narrow story-stack">
    <Input placeholder="hello@acme.com" />
    <Input defaultValue="filled@acme.com" />
    <Input disabled placeholder="disabled" />
  </div>
);
