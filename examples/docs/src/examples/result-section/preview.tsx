"use client";

import { IconDiamond } from "@karrotmarket/react-multicolor-icon";
import { VStack, Icon, Box } from "@grape-design/react";
import { ResultSection } from "grape-design/ui/result-section";

export default function ResultSectionPreview() {
  return (
    <VStack minHeight="480px" width="320px" borderWidth={1} borderColor="stroke.neutralMuted">
      <ResultSection
        asset={
          <Box pb="x4">
            <Icon svg={<IconDiamond />} size="x10" />
          </Box>
        }
        title="결과 타이틀"
        description="부가 Description 적어주세요"
        primaryActionProps={{
          children: "Primary Action",
          onClick: () => window.alert("Primary Action Clicked"),
        }}
        secondaryActionProps={{
          children: "Secondary Action",
          onClick: () => window.alert("Secondary Action Clicked"),
        }}
      />
    </VStack>
  );
}
