"use client";

import { IconFaceSmileCircleFill } from "@karrotmarket/react-monochrome-icon";
import { PrefixIcon } from "@grape-design/react";
import { useState } from "react";
import { ReactionButton } from "seed-design/ui/reaction-button";

export default function ReactionButtonLoading() {
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
    <ReactionButton loading={loading} pressed={pressed} onPressedChange={handleToggle}>
      <PrefixIcon svg={<IconFaceSmileCircleFill />} />
      시간이 걸리는 토글
    </ReactionButton>
  );
}
