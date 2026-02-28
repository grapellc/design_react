"use client";

import { ActionButton } from "grapu-design/ui/action-button";
import {
  BottomSheetBody,
  BottomSheetContent,
  BottomSheetFooter,
  BottomSheetRoot,
  BottomSheetTrigger,
} from "grapu-design/ui/bottom-sheet";

const BottomSheetTriggerExample = () => {
  return (
    <BottomSheetRoot>
      <BottomSheetTrigger asChild>
        <ActionButton variant="neutralSolid">Open</ActionButton>
      </BottomSheetTrigger>
      <BottomSheetContent title="제목">
        <BottomSheetBody minHeight="x16">Content</BottomSheetBody>
        <BottomSheetFooter>
          <ActionButton variant="neutralSolid">OK</ActionButton>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheetRoot>
  );
};

export default BottomSheetTriggerExample;
