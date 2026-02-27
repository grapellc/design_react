import type { AppScreenProps } from "grape_design_react/ui/app-screen";

export const theme: NonNullable<AppScreenProps["theme"]> = /iphone|ipad|ipod/i.test(
  window.navigator.userAgent.toLowerCase(),
)
  ? "cupertino"
  : "android";
