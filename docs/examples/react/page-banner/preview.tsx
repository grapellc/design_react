import { VStack } from "@grape_design_react/react";
import {
  ActionablePageBanner,
  DismissiblePageBanner,
  PageBanner,
} from "grape_design_react/ui/page-banner";

export default function PageBannerPreview() {
  return (
    <VStack gap="x4" width="full">
      <PageBanner description="Ut veniam in ea ea anim laborum magna dolore ea laborum duis ut aute mollit amet." />
      <ActionablePageBanner description="Ut veniam in ea ea anim laborum magna dolore ea laborum duis ut aute mollit amet." />
      <DismissiblePageBanner description="Ut veniam in ea ea anim laborum magna dolore ea laborum duis ut aute mollit amet." />
    </VStack>
  );
}
