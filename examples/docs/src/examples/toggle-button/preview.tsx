"use client";

import { useState } from "react";
import { ToggleButton } from "seed-design/ui/toggle-button";

export default function ToggleButtonPreview() {
  const [pressed, setPressed] = useState(false);

  return (
    <ToggleButton pressed={pressed} onPressedChange={setPressed}>
      {pressed ? "Select됨" : "미Select"}
    </ToggleButton>
  );
}
