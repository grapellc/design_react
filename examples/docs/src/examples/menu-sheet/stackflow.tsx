"use client";

import { Flex, VStack } from "@grapu-design/react";
import { useActivity, useFlow, type StaticActivityComponentType } from "@stackflow/react/future";
import { useState } from "react";
import {
  IconPenHorizlineFill,
  IconPlusLine,
  IconTrashcanLine,
} from "@grapu-design/icons";
import {
  MenuSheetContent,
  MenuSheetGroup,
  MenuSheetItem,
  MenuSheetRoot,
} from "grapu-design/ui/menu-sheet";
import { Switch } from "grapu-design/ui/switch";
import { useActivityZIndexBase } from "@grapu-design/stackflow";

declare module "@stackflow/config" {
  interface Register {
    "react/menu-sheet/stackflow": {};
  }
}

const MenuSheetStackflow: StaticActivityComponentType<"react/menu-sheet/stackflow"> = () => {
  const activity = useActivity();
  const { pop, push } = useFlow();
  const [keepMounted, setKeepMounted] = useState(false);

  const open = keepMounted
    ? activity.transitionState === "enter-active" || activity.transitionState === "enter-done"
    : activity.isActive;

  const onOpenChange = keepMounted
    ? (next: boolean) => !next && activity.isActive && pop()
    : (next: boolean) => !next && pop();

  const handleAction = () => pop();

  return (
    <MenuSheetRoot open={open} onOpenChange={onOpenChange}>
      <MenuSheetContent title="Actions" layerIndex={useActivityZIndexBase()}>
        <MenuSheetGroup>
          <MenuSheetItem
            onClick={() => handleAction()}
            label="Add"
            prefixIcon={<IconPlusLine />}
          />
          <MenuSheetItem
            onClick={() => handleAction()}
            label="Edit"
            prefixIcon={<IconPenHorizlineFill />}
          />
          <MenuSheetItem
            onClick={() => handleAction()}
            tone="critical"
            label="Delete"
            prefixIcon={<IconTrashcanLine />}
          />
        </MenuSheetGroup>
        <VStack gap="x2">
          <MenuSheetGroup>
            <MenuSheetItem
              onClick={() => push("react/menu-sheet/activity", {})}
              label="Push trigger activity"
            />
          </MenuSheetGroup>
          <Flex px="x2" py="x1_5">
            <Switch
              tone="neutral"
              size="16"
              label="Keep overlay mounted after push"
              checked={keepMounted}
              onCheckedChange={setKeepMounted}
            />
          </Flex>
        </VStack>
      </MenuSheetContent>
    </MenuSheetRoot>
  );
};

export default MenuSheetStackflow;
