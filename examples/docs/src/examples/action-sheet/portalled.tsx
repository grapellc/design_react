"use client";

import { Portal } from "@grape-design/react";
import { ActionButton } from "grape-design/ui/action-button";
import {
  ActionSheetContent,
  ActionSheetItem,
  ActionSheetRoot,
  ActionSheetTrigger,
} from "grape-design/ui/action-sheet";

const ActionSheetPortalled = () => {
  return (
    <ActionSheetRoot>
      <ActionSheetTrigger asChild>
        <ActionButton>Open</ActionButton>
      </ActionSheetTrigger>
      <Portal>
        <ActionSheetContent aria-label="Action Sheet">
          <ActionSheetItem label="Action 1" />
          <ActionSheetItem label="Action 2" />
          <ActionSheetItem tone="critical" label="Action 3" />
        </ActionSheetContent>
      </Portal>
    </ActionSheetRoot>
  );
};

export default ActionSheetPortalled;
