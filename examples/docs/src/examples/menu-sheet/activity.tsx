"use client";

import { VStack } from "@grape-design/react";
import { useFlow, type StaticActivityComponentType } from "@stackflow/react/future";
import {
  AppBar,
  AppBarBackButton,
  AppBarIconButton,
  AppBarLeft,
  AppBarMain,
  AppBarRight,
} from "grape-design/ui/app-bar";
import { AppScreen, AppScreenContent } from "grape-design/ui/app-screen";
import { ActionButton } from "grape-design/ui/action-button";
import { IconHouseLine } from "@grape-design/icons";

declare module "@stackflow/config" {
  interface Register {
    "react/menu-sheet/activity": {};
  }
}

const MenuSheetActivity: StaticActivityComponentType<"react/menu-sheet/activity"> = () => {
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
            onClick={() => replace("react/menu-sheet/activity", {})}
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
            onClick={() => push("react/menu-sheet/stackflow", {})}
          >
            Push Menu Sheet
          </ActionButton>
          <ActionButton
            variant="neutralWeak"
            flexGrow
            onClick={() => push("react/menu-sheet/activity", {})}
          >
            Push this Activity
          </ActionButton>
        </VStack>
      </AppScreenContent>
    </AppScreen>
  );
};

export default MenuSheetActivity;
