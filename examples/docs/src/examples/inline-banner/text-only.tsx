"use client";

import { VStack } from "@grapu-design/react";
import {
  ActionableInlineBanner,
  DismissibleInlineBanner,
  InlineBanner,
} from "grapu-design/ui/inline-banner";

export default function InlineBannerTextOnly() {
  return (
    <VStack gap="x4" width="full">
      <InlineBanner description="사업자 정보를 등록해주세요." />
      <ActionableInlineBanner description="사업자 정보를 등록해주세요." />
      <DismissibleInlineBanner description="사업자 정보를 등록해주세요." />
    </VStack>
  );
}
