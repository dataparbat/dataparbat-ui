import { useState } from "react";

import { Badge } from "../badge/badge";
import { Banner } from "../banner/banner";
import { Button } from "../button/button";
import { Checkbox } from "../checkbox/checkbox";
import { Chip } from "../chip/chip";
import { CommandPalette, PaletteGroup, PaletteItem } from "../command-palette/command-palette";
import { Meter } from "../meter/meter";
import { Radio } from "../radio/radio";
import { SegmentedControl } from "../segmented/segmented";
import { Switch } from "../switch/switch";
import { Toast } from "../toast/toast";
import { Gated, Tooltip } from "../tooltip/tooltip";
import { WireHeader, WireValue } from "../wire-header/wire-header";

export const WireAndChips = () => (
  <div className="story-pad story-stack">
    <WireHeader>
      canvas: <WireValue>F</WireValue> · kind: foundation · status: locked
    </WireHeader>
    <div className="story-row story-wrap">
      <Chip k="mode" v="live" state="live" />
      <Chip k="mode" v="test" state="test" />
      <Chip k="stage" v="preview" state="preview" />
      <Chip k="region" v="eu-west-1" state="plain" />
    </div>
    <div className="story-row story-wrap">
      <Badge tone="ga">GA</Badge>
      <Badge tone="prev">Preview</Badge>
      <Badge tone="internal">Internal</Badge>
      <Badge tone="sunset">Sunset</Badge>
    </div>
  </div>
);

export const FormControls = () => {
  const [mode, setMode] = useState<"live" | "test">("live");

  return (
    <div className="story-pad story-stack">
      <Checkbox label="Suppress on hard bounce" defaultChecked />
      <Radio name="plan" label="Pro plan" defaultChecked />
      <Radio name="plan" label="Scale plan" />
      <Switch label="Require MFA for this workspace" defaultChecked />
      <SegmentedControl
        label="Sending mode"
        value={mode}
        onChange={setMode}
        options={[
          { id: "live", label: "live" },
          { id: "test", label: "test", tone: "test" },
        ]}
      />
    </div>
  );
};

export const Feedback = () => (
  <div className="story-pad story-stack">
    <Toast count="2 of 4">Domain verified. Sending is live.</Toast>
    <Banner tone="warn">Warmup day 3 of 42 — daily quota rises automatically.</Banner>
    <div className="story-row">
      <Tooltip content="msg_2b7Kq9tXfLpN · 14:32:07 UTC" underline>
        3 minutes ago
      </Tooltip>
      <Gated reason="Requires the members:manage permission">
        <Button kind="primary" disabled>
          Invite member
        </Button>
      </Gated>
    </div>
    <div className="story-narrow story-stack">
      <Meter value={62} max={100} label="Daily quota used" />
      <Meter value={91} max={100} tone="warn" label="Daily quota used" />
    </div>
  </div>
);

export const Palette = () => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("send");

  return (
    <div className="story-pad">
      <CommandPalette
        query={query}
        onQueryChange={setQuery}
        placeholder="Search actions, pages, docs…"
        label="Command palette"
      >
        <PaletteGroup label="actions" />
        <PaletteItem active={active === "send"} onSelect={() => setActive("send")} shortcut="⌘E">
          Send a test email
        </PaletteItem>
        <PaletteItem active={active === "key"} onSelect={() => setActive("key")}>
          Create an API key
        </PaletteItem>
        <PaletteGroup label="pages" />
        <PaletteItem active={active === "domains"} onSelect={() => setActive("domains")}>
          Sending domains
        </PaletteItem>
      </CommandPalette>
    </div>
  );
};
