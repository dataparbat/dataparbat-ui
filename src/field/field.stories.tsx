import { Field } from "./field";
import { Input } from "../input/input";
import { Select } from "../select/select";

export const TextInput = () => (
  <div className="story-pad story-narrow story-stack">
    <Field label="From address" hint="Any local part at a verified domain.">
      <Input placeholder="hello@acme.com" />
    </Field>
    <Field label="Plan">
      <Select>
        <option>Free</option>
        <option>Scale</option>
      </Select>
    </Field>
  </div>
);
