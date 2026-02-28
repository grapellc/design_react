"use client";

import { IconBellFill } from "@karrotmarket/react-monochrome-icon";
import { ExtendedFab, PrefixIcon } from "@grapu-design/react";

export default function ExtendedFabPreview() {
  return (
    <ExtendedFab>
      <PrefixIcon svg={<IconBellFill />} />
      Notice 설정
    </ExtendedFab>
  );
}
