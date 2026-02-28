"use client";

import { useState } from "react";
import { ToggleButton } from "grape-design/ui/toggle-button";

export default function ToggleButtonBrandSolid() {
  const [pressed, setPressed] = useState(false);

  return (
    <ToggleButton variant="neutralWeak" pressed={pressed} onPressedChange={setPressed}>
      {pressed ? "Select됨" : "미Select"}
    </ToggleButton>
  );
}
