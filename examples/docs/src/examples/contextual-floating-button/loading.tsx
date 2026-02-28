"use client";

import { IconPlusLine } from "@karrotmarket/react-monochrome-icon";
import { PrefixIcon } from "@grape-design/react";
import { useState } from "react";
import { ContextualFloatingButton } from "grape-design/ui/contextual-floating-button";

export default function ContextualFloatingButtonLoading() {
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }

  // Loading does not imply disabled so you can handle events. Use disabled if you want to prevent 속성을 추가해주세요.
  return (
    <ContextualFloatingButton loading={loading} onClick={handleClick}>
      <PrefixIcon svg={<IconPlusLine />} />
      Action that takes time
    </ContextualFloatingButton>
  );
}
