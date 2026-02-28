"use client";

import { useState } from "react";
import { ToggleButton } from "grapu-design/ui/toggle-button";

export default function ToggleButtonBrandSolid() {
  const [pressed, setPressed] = useState(false);

  return (
    <ToggleButton variant="brandSolid" pressed={pressed} onPressedChange={setPressed}>
      {pressed ? "Select됨" : "미Select"}
    </ToggleButton>
  );
}
