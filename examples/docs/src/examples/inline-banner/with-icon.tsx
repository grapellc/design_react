"use client";

import { IconBellFill } from "@karrotmarket/react-monochrome-icon";
import { VStack } from "@grape-design/react";
import {
  ActionableInlineBanner,
  DismissibleInlineBanner,
  InlineBanner,
} from "grape-design/ui/inline-banner";

export default function InlineBannerWithIcon() {
  return (
    <VStack gap="x4" width="full">
      <InlineBanner prefixIcon={<IconBellFill />} description="사업자 정보를 등록해주세요." />
      <ActionableInlineBanner
        prefixIcon={<IconBellFill />}
        description="사업자 정보를 등록해주세요."
      />
      <DismissibleInlineBanner
        prefixIcon={<IconBellFill />}
        description="사업자 정보를 등록해주세요."
      />
    </VStack>
  );
}
