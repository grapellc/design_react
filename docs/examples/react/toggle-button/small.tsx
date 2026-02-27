import { useState } from "react";
import { ToggleButton } from "grape_design_react/ui/toggle-button";

export default function ToggleButtonSmall() {
  const [pressed, setPressed] = useState(false);

  return (
    <ToggleButton size="small" pressed={pressed} onPressedChange={setPressed}>
      {pressed ? "선택됨" : "미선택"}
    </ToggleButton>
  );
}
