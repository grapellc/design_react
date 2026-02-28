"use client";

import { IconPlusFill } from "@karrotmarket/react-monochrome-icon";
import { PrefixIcon } from "@grapu-design/react";
import { ActionButton } from "grapu-design/ui/action-button";

export default function ActionButtonPrefixIcon() {
  return (
    <ActionButton>
      <PrefixIcon svg={<IconPlusFill />} />
      라벨
    </ActionButton>
  );
}
