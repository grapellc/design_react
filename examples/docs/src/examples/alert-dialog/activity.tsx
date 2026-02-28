"use client";

import { VStack } from "@seed-design/react";
import { useFlow, type StaticActivityComponentType } from "@stackflow/react/future";
import {
  AppBar,
  AppBarBackButton,
  AppBarIconButton,
  AppBarLeft,
  AppBarMain,
  AppBarRight,
} from "seed-design/ui/app-bar";
import { AppScreen, AppScreenContent } from "seed-design/ui/app-screen";
import { ActionButton } from "seed-design/ui/action-button";
import { IconHouseLine } from "@grape-design/icons";

declare module "@stackflow/config" {
  interface Register {
    "react/alert-dialog/activity": {};
  }
}

const AlertDialogActivity: StaticActivityComponentType<"react/alert-dialog/activity"> = () => {
  const { push, replace } = useFlow();

  return (
    <AppScreen>
      <AppBar>
        <AppBarLeft>
          <AppBarBackButton />
        </AppBarLeft>
        <AppBarMain title="Activity" />
        <AppBarRight>
          <AppBarIconButton
            aria-label="Home"
            onClick={() => replace("react/alert-dialog/activity", {})}
          >
            <IconHouseLine />
          </AppBarIconButton>
        </AppBarRight>
      </AppBar>
      <AppScreenContent>
        <VStack p="x5" justify="center" gap="x4">
          <ActionButton
            variant="neutralSolid"
            flexGrow
            onClick={() => push("react/alert-dialog/stackflow", {})}
          >
            Push Alert Dialog
          </ActionButton>
          <ActionButton
            variant="neutralWeak"
            flexGrow
            onClick={() => push("react/alert-dialog/activity", {})}
          >
            Push this Activity
          </ActionButton>
        </VStack>
      </AppScreenContent>
    </AppScreen>
  );
};

export default AlertDialogActivity;
