"use client";

import { useState } from "react";
import { ActionButton } from "grapu-design/ui/action-button";
import {
  BottomSheetBody,
  BottomSheetContent,
  BottomSheetFooter,
  BottomSheetRoot,
  BottomSheetTrigger,
} from "grapu-design/ui/bottom-sheet";

const BottomSheetShowHandle = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <BottomSheetRoot open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <BottomSheetTrigger asChild>
        <ActionButton variant="neutralSolid">Open</ActionButton>
      </BottomSheetTrigger>
      <BottomSheetContent title="제목" description="Description 작성할 수 있어요" showHandle>
        {/* If you need to omit padding, pass px={0}. */}
        <BottomSheetBody minHeight="x16">Content</BottomSheetBody>
        <BottomSheetFooter>
          <ActionButton variant="neutralSolid" onClick={() => setIsSheetOpen(false)}>
            Close
          </ActionButton>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheetRoot>
  );
};

export default BottomSheetShowHandle;
