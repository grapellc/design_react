// @ts-nocheck

import { text } from "@grape_design_react/css/recipes/text";
import { match } from "ts-pattern";

match(size)
  .with("large", () => text({ textStyle: "t4Bold" }))
  .with("medium", () => text({ textStyle: "t4Bold" }))
  .with("small", () => text({ textStyle: "t4Bold" }))
  .with("xsmall", () => text({ textStyle: "t2Bold" }))
  .exhaustive();
