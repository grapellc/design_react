"use client";

import { VStack } from "@grapu-design/react";
import { Callout, DismissibleCallout } from "grapu-design/ui/callout";

export default function CalloutWithLinkLabel() {
  return (
    <VStack gap="x4" width="full">
      <Callout
        description="기능에 대한 Guide 또는 유익한 Content을 전달해요. 콜아웃은 꼭 필요한 경우에만 절제하여 사용해요."
        linkProps={{ children: "시도해 보기" }}
      />
      <DismissibleCallout
        description="기능에 대한 Guide 또는 유익한 Content을 전달해요. 콜아웃은 꼭 필요한 경우에만 절제하여 사용해요."
        linkProps={{ children: "시도해 보기" }}
      />
    </VStack>
  );
}
