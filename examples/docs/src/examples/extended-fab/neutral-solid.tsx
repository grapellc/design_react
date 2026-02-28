"use client";

import { IconBellFill } from "@karrotmarket/react-monochrome-icon";
import { ExtendedFab, PrefixIcon } from "@grapu-design/react";

export default function ExtendedFabNeutralSolid() {
  return (
    <ExtendedFab variant="neutralSolid">
      <PrefixIcon svg={<IconBellFill />} />
      Notice 설정
    </ExtendedFab>
  );
}
