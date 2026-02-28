"use client";

import { useState } from "react";
import { ToggleButton } from "grape-design/ui/toggle-button";

export default function ToggleButtonLoading() {
  const [pressed, setPressed] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleToggle() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPressed((prev) => !prev);
    }, 2000);
  }

  // Loading does not imply disabled so you can handle events. Use disabled if you want to prevent 속성을 추가해주세요.
  return (
    <ToggleButton loading={loading} pressed={pressed} onPressedChange={handleToggle}>
      시간이 걸리는 토글
    </ToggleButton>
  );
}
