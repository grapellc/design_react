import { useState } from "react";
import { ToggleButton } from "grape_design_react/ui/toggle-button";

export default function ToggleButtonPreview() {
  const [pressed, setPressed] = useState(false);

  return (
    <ToggleButton pressed={pressed} onPressedChange={setPressed}>
      {pressed ? "선택됨" : "미선택"}
    </ToggleButton>
  );
}
