"use client";

import { Box, VStack } from "@grapu-design/react";
import { ActionButton } from "grapu-design/ui/action-button";
import {
  BottomSheetBody,
  BottomSheetContent,
  BottomSheetFooter,
  BottomSheetRoot,
  BottomSheetTrigger,
} from "grapu-design/ui/bottom-sheet";

const BottomSheetMaxHeight = () => {
  return (
    <BottomSheetRoot>
      <BottomSheetTrigger asChild>
        <ActionButton variant="neutralSolid">Open</ActionButton>
      </BottomSheetTrigger>
      <BottomSheetContent title="제목" description="Description 작성할 수 있어요">
        {/* If you need to omit padding, pass px={0}. */}
        <BottomSheetBody>
          <VStack maxHeight="300px" overflowY="auto">
            <VStack justifyContent="center" alignItems="center" gap="x4" height="100%">
              <Box width="100%" height="100px" bg="bg.layerBasement" />
              <Box width="100%" height="100px" bg="bg.layerBasement" />
              <Box width="100%" height="100px" bg="bg.layerBasement" />
              <Box width="100%" height="100px" bg="bg.layerBasement" />
            </VStack>
          </VStack>
        </BottomSheetBody>
        <BottomSheetFooter>
          <ActionButton variant="neutralSolid">OK</ActionButton>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheetRoot>
  );
};

export default BottomSheetMaxHeight;
