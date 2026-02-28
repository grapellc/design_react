"use client";

import { VStack } from "@grape-design/react";
import {
  IconChevronLeftLine,
  IconXmarkLine,
} from "@karrotmarket/react-monochrome-icon"; // "@daangn/react-monochrome-icon"과 동일합니다.
import { AppBar as SeedAppBar } from "@seed-design/stackflow";
import { useActions, useActivity } from "@stackflow/react";
import * as React from "react";
import { createContext, forwardRef, useCallback, useContext, useLayoutEffect, useRef } from "react";
import { StandalonePreviewContext } from "../StandalonePreviewContext";

type AppBarTone = "layer" | "transparent" | undefined;

const AppBarToneContext = createContext<AppBarTone>(undefined);

const ICON_COLOR_LAYER = "var(--seed-color-fg-neutral, #0f172a)";
const ICON_COLOR_TRANSPARENT = "var(--seed-color-palette-static-white, white)";

export interface AppBarProps extends SeedAppBar.RootProps {
  layerOffsetTop?: unknown;
  gradient?: unknown;
  preventSwipeBack?: unknown;
}

const APP_BAR_NON_DOM_KEYS = new Set([
  "layerOffsetTop",
  "gradient",
  "preventSwipeBack",
]);

function omitAppBarNonDomProps<P extends Record<string, unknown>>(
  obj: P,
): Omit<P, "layerOffsetTop" | "gradient" | "preventSwipeBack"> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !APP_BAR_NON_DOM_KEYS.has(key)),
  ) as Omit<P, "layerOffsetTop" | "gradient" | "preventSwipeBack">;
}

const APP_BAR_STRIP_DOM_ATTRS = ["layerOffsetTop", "gradient", "preventSwipeBack"];

function useStripAppBarNonDomAttrs(ref: React.Ref<HTMLDivElement | null>) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const callbackRef = useCallback(
    (el: HTMLDivElement | null) => {
      elRef.current = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }
    },
    [ref],
  );
  useLayoutEffect(() => {
    const el = elRef.current;
    if (el) {
      APP_BAR_STRIP_DOM_ATTRS.forEach((key) => el.removeAttribute(key.toLowerCase()));
    }
  });
  return callbackRef;
}

export const AppBar = forwardRef<HTMLDivElement, AppBarProps>((props, ref) => {
  const standalone = useContext(StandalonePreviewContext);
  const safeProps = omitAppBarNonDomProps(props as Record<string, unknown>);
  const tone = (safeProps as { tone?: AppBarTone }).tone;
  const stripRef = useStripAppBarNonDomAttrs(ref);
  const root = standalone ? (
    <div ref={ref} role="banner" {...safeProps} />
  ) : (
    <SeedAppBar.Root ref={stripRef} {...safeProps} />
  );
  return (
    <AppBarToneContext.Provider value={tone}>{root}</AppBarToneContext.Provider>
  );
});
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
      <SeedAppBar.Main
        layout={subtitle ? "withSubtitle" : "titleOnly"}
        {...otherProps}
        ref={ref}
      >
        <VStack overflowX="auto">
          <SeedAppBar.Title>{children ?? title}</SeedAppBar.Title>
          {subtitle ? (
            <SeedAppBar.Subtitle>{subtitle}</SeedAppBar.Subtitle>
          ) : null}
        </VStack>
      </SeedAppBar.Main>
    );
  },
);
AppBarMain.displayName = "AppBarMain";

export interface AppBarIconButtonProps extends SeedAppBar.IconButtonProps {}

function useAppBarIconColor(standalone: boolean): React.CSSProperties | undefined {
  const tone = useContext(AppBarToneContext);
  if (tone === undefined) return undefined;
  const color =
    tone === "transparent" ? ICON_COLOR_TRANSPARENT : ICON_COLOR_LAYER;
  if (standalone) return { color };
  return { ["--seed-icon-color" as string]: color };
}

export const AppBarIconButton = forwardRef<
  HTMLButtonElement,
  AppBarIconButtonProps
>(({ style, ...props }, ref) => {
  const standalone = useContext(StandalonePreviewContext);
  const iconColorStyle = useAppBarIconColor(standalone);
  const mergedStyle =
    iconColorStyle && style
      ? { ...iconColorStyle, ...style }
      : iconColorStyle ?? style;
  if (standalone) {
    return (
      <button ref={ref} type="button" style={mergedStyle} {...props} />
    );
  }
  return (
    <SeedAppBar.IconButton ref={ref} style={mergedStyle} {...props} />
  );
});
AppBarIconButton.displayName = "AppBarIconButton";

export const AppBarBackButton = forwardRef<
  HTMLButtonElement,
  AppBarIconButtonProps
>(({ children = <IconChevronLeftLine />, onClick, style, ...otherProps }, ref) => {
  const standalone = useContext(StandalonePreviewContext);
  const iconColorStyle = useAppBarIconColor(standalone);
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

  const mergedStyle =
    iconColorStyle && style
      ? { ...iconColorStyle, ...style }
      : iconColorStyle ?? style;

  if (standalone) {
    return (
      <button
        ref={ref}
        aria-label="Back"
        type="button"
        onClick={handleOnClick}
        style={mergedStyle}
        {...otherProps}
      >
        {children}
      </button>
    );
  }

  return (
    <SeedAppBar.IconButton
      ref={ref}
      aria-label="Back"
      type="button"
      onClick={handleOnClick}
      style={mergedStyle}
      {...otherProps}
    >
      {children}
    </SeedAppBar.IconButton>
  );
});
AppBarBackButton.displayName = "AppBarBackButton";

export const AppBarCloseButton = forwardRef<
  HTMLButtonElement,
  AppBarIconButtonProps
>(({ children = <IconXmarkLine />, onClick, ...otherProps }, ref) => {
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
      aria-label="Close"
      type="button"
      onClick={handleOnClick}
      {...otherProps}
    >
      {children}
    </AppBarIconButton>
  );
});
AppBarCloseButton.displayName = "AppBarCloseButton";
