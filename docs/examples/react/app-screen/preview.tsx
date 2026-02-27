import { IconBellFill } from "@karrotmarket/react-monochrome-icon";
import { Flex } from "@grape_design_react/react";
import type { ActivityComponentType } from "@stackflow/react/future";
import {
  AppBar,
  AppBarCloseButton,
  AppBarIconButton,
  AppBarLeft,
  AppBarMain,
  AppBarRight,
} from "grape_design_react/ui/app-bar";
import { AppScreen, AppScreenContent } from "grape_design_react/ui/app-screen";

declare module "@stackflow/config" {
  interface Register {
    "react/app-screen/preview": {};
  }
}

const AppScreenPreviewActivity: ActivityComponentType<"react/app-screen/preview"> = () => {
  return (
    <AppScreen theme="cupertino">
      <AppBar>
        <AppBarLeft>
          <AppBarCloseButton />
        </AppBarLeft>
        <AppBarMain>Preview</AppBarMain>
        <AppBarRight>
          <AppBarIconButton aria-label="Notification">
            <IconBellFill />
          </AppBarIconButton>
        </AppBarRight>
      </AppBar>
      <AppScreenContent>
        <Flex height="full" justify="center" align="center">
          Preview
        </Flex>
      </AppScreenContent>
    </AppScreen>
  );
};

export default AppScreenPreviewActivity;
