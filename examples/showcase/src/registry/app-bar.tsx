"use client";

import { IconChevronLeftLine, IconXmarkLine } from "@karrotmarket/react-monochrome-icon"; // "@daangn/react-monochrome-icon"과 동일합니다.
import { VStack } from "@grape-design/react";
import { AppBar as SeedAppBar } from "@seed-design/stackflow";
import { useActions, useActivity } from "@stackflow/react";
import * as React from "react";
import { forwardRef, useContext } from "react";
import { StandalonePreviewContext } from "../StandalonePreviewContext";

export interface AppBarProps extends SeedAppBar.RootProps {}

export const AppBar = forwardRef<HTMLDivElement, AppBarProps>(
  (props, ref) => {
    const standalone = useContext(StandalonePreviewContext);
    if (standalone) {
      return <div ref={ref} role="banner" {...props} />;
    }
    return <SeedAppBar.Root ref={ref} {...props} />;
  },
);
AppBar.displayName = "AppBar";

export interface AppBarLeftProps extends SeedAppBar.LeftProps {}

export const AppBarLeft = forwardRef<HTMLDivElement, AppBarLeftProps>(
  (props, ref) => {
    const standalone = useContext(StandalonePreviewContext);
    if (standalone) return <div ref={ref} {...props} />;
    return <SeedAppBar.Left ref={ref} {...props} />;
  },
);
AppBarLeft.displayName = "AppBarLeft";

export interface AppBarRightProps extends SeedAppBar.RightProps {}

export const AppBarRight = forwardRef<HTMLDivElement, AppBarRightProps>(
  (props, ref) => {
    const standalone = useContext(StandalonePreviewContext);
    if (standalone) return <div ref={ref} {...props} />;
    return <SeedAppBar.Right ref={ref} {...props} />;
  },
);
AppBarRight.displayName = "AppBarRight";

export interface AppBarMainProps extends Omit<SeedAppBar.MainProps, "asChild"> {
  /**
   * The title of the app bar.
   * If children is provided as ReactElement, this prop will be ignored.
   */
  title?: string;

  /**
   * The subtitle of the app bar.
   * If children is provided as ReactElement, this prop will be ignored.
   */
  subtitle?: string;
}

export const AppBarMain = forwardRef<HTMLDivElement, AppBarMainProps>(
  ({ title, subtitle, children, ...otherProps }, ref) => {
    const standalone = useContext(StandalonePreviewContext);
    if (standalone) {
      return (
        <div ref={ref} {...otherProps}>
          <VStack overflowX="auto">
            <span>{children ?? title}</span>
            {subtitle ? <span>{subtitle}</span> : null}
          </VStack>
        </div>
      );
    }
    if (React.isValidElement(children)) {
      return (
        <SeedAppBar.Main {...otherProps} ref={ref}>
          {children}
        </SeedAppBar.Main>
      );
    }

    return (
      <SeedAppBar.Main layout={subtitle ? "withSubtitle" : "titleOnly"} {...otherProps} ref={ref}>
        <VStack overflowX="auto">
          <SeedAppBar.Title>{children ?? title}</SeedAppBar.Title>
          {subtitle ? <SeedAppBar.Subtitle>{subtitle}</SeedAppBar.Subtitle> : null}
        </VStack>
      </SeedAppBar.Main>
    );
  },
);
AppBarMain.displayName = "AppBarMain";

export interface AppBarIconButtonProps extends SeedAppBar.IconButtonProps {}

export const AppBarIconButton = forwardRef<HTMLButtonElement, AppBarIconButtonProps>(
  (props, ref) => {
    const standalone = useContext(StandalonePreviewContext);
    if (standalone) return <button ref={ref} type="button" {...props} />;
    return <SeedAppBar.IconButton ref={ref} {...props} />;
  },
);
AppBarIconButton.displayName = "AppBarIconButton";

export const AppBarBackButton = forwardRef<HTMLButtonElement, AppBarIconButtonProps>(
  ({ children = <IconChevronLeftLine />, onClick, ...otherProps }, ref) => {
    const activity = useActivity();
    const actions = useActions();

    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);

      if (!e.defaultPrevented) {
        actions.pop();
      }
    };

    if (!activity) {
      return null;
    }
    if (activity.isRoot) {
      return null;
    }

    return (
      <SeedAppBar.IconButton
        ref={ref}
        aria-label="뒤로"
        type="button"
        onClick={handleOnClick}
        {...otherProps}
      >
        {children}
      </SeedAppBar.IconButton>
    );
  },
);
AppBarBackButton.displayName = "AppBarBackButton";

export const AppBarCloseButton = forwardRef<HTMLButtonElement, AppBarIconButtonProps>(
  ({ children = <IconXmarkLine />, onClick, ...otherProps }, ref) => {
    const activity = useActivity();

    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);

      if (!e.defaultPrevented) {
        // you can do something here
      }
    };

    const isRoot = !activity || activity.isRoot;

    if (!isRoot) {
      return null;
    }

    return (
      <AppBarIconButton
        ref={ref}
        aria-label="닫기"
        type="button"
        onClick={handleOnClick}
        {...otherProps}
      >
        {children}
      </AppBarIconButton>
    );
  },
);
AppBarCloseButton.displayName = "AppBarCloseButton";
