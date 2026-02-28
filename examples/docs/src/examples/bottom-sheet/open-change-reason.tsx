"use client";

import { HStack, Text, VStack } from "@seed-design/react";
import { useState } from "react";
import { ActionButton } from "seed-design/ui/action-button";
import {
  BottomSheetBody,
  BottomSheetContent,
  BottomSheetRoot,
  BottomSheetTrigger,
} from "seed-design/ui/bottom-sheet";

const snapPoints = ["200px", "400px", 1];

export default function BottomSheetOnOpenChangeReason() {
  const [open, setOpen] = useState(false);
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  const [closeReason, setCloseReason] = useState<string | null>(null);

  return (
    <VStack gap="x4" align="center">
      <BottomSheetRoot
        open={open}
        onOpenChange={(open, details) => {
          setOpen(open);

          if (open) return;

          setCloseReason(details?.reason ?? null);
        }}
        snapPoints={snapPoints}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
      >
        <BottomSheetTrigger asChild>
          <ActionButton variant="neutralSolid">Open</ActionButton>
        </BottomSheetTrigger>
        <BottomSheetContent title="Notice" showHandle style={{ height: "100%", maxHeight: "97%" }}>
          <BottomSheetBody minHeight="x16">
            <Text textStyle="t4Medium" color="fg.neutralMuted">
              ESC 키를 누르거나, 외부 영역을 클릭하거나, 아래로 스와이프하거나, 핸들을 탭하여 snap
              point를 순환해보세요.
            </Text>
          </BottomSheetBody>
        </BottomSheetContent>
      </BottomSheetRoot>

      <HStack gap="x4">
        <Text fontSize="t3" color="fg.neutralMuted">
          Last close reason: {closeReason ?? "-"}
        </Text>
      </HStack>
    </VStack>
  );
}
