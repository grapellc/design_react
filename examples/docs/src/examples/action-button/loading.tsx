"use client";

import { useState } from "react";
import { ActionButton } from "seed-design/ui/action-button";

export default function ActionButtonLoading() {
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }

  // Loading does not imply disabled so you can handle events. Use disabled if you want to prevent 속성을 추가해주세요.
  return (
    <ActionButton loading={loading} onClick={handleClick}>
      Action that takes time
    </ActionButton>
  );
}
