"use client";

import { ActionButton } from "grapu-design/ui/action-button";
import {
  BottomSheetBody,
  BottomSheetContent,
  BottomSheetFooter,
  BottomSheetRoot,
  BottomSheetTrigger,
} from "grapu-design/ui/bottom-sheet";

const BottomSheetSkipAnimation = () => {
  return (
    <BottomSheetRoot skipAnimation>
      <BottomSheetTrigger asChild>
        <ActionButton variant="neutralSolid">Open</ActionButton>
      </BottomSheetTrigger>
      <BottomSheetContent title="제목" description="Description 작성할 수 있어요">
        <BottomSheetBody>Content</BottomSheetBody>
        <BottomSheetFooter>
          <ActionButton variant="neutralSolid">OK</ActionButton>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheetRoot>
  );
};

export default BottomSheetSkipAnimation;
