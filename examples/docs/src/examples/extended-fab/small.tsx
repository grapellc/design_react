"use client";

import { IconBellFill } from "@karrotmarket/react-monochrome-icon";
import { ExtendedFab, PrefixIcon } from "@grapu-design/react";

export default function ExtendedFabSmall() {
  return (
    <ExtendedFab size="small">
      <PrefixIcon svg={<IconBellFill />} />
      Notice 설정
    </ExtendedFab>
  );
}
