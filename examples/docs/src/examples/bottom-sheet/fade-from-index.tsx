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

const snapPoints = ["300px", "500px", 1];

const BottomSheetFadeFromIndex = () => {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  return (
    <BottomSheetRoot
      fadeFromIndex={0}
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
    >
      <BottomSheetTrigger asChild>
        <ActionButton variant="neutralSolid">Open</ActionButton>
      </BottomSheetTrigger>
      <BottomSheetContent
        title="제목"
        description="Description 작성할 수 있어요"
        /**
         * snap points를 사용할 때는 handle을 Show해야 합니다.
         */
        showHandle
        /**
         * 높이를 100%로 설정해야 snap points가 제대로 작동합니다.
         */
        style={{ height: "100%", maxHeight: "97%" }}
      >
        <BottomSheetBody>Content</BottomSheetBody>
        <BottomSheetFooter>
          <ActionButton variant="neutralSolid">OK</ActionButton>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheetRoot>
  );
};

export default BottomSheetFadeFromIndex;
