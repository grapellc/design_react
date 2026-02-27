import { createMonochromeIcon } from "./createMonochromeIcon";

const ICON_NAMES = [
  "IconArrowClockwiseCircularFill",
  "IconArrowClockwiseCircularLine",
  "IconBellFill",
  "IconBellLine",
  "IconBellSlashLine",
  "IconCalendarFill",
  "IconCarrotFill",
  "IconCheckmarkCircleFill",
  "IconCheckmarkFatFill",
  "IconCheckmarkLine",
  "IconChevronDownFill",
  "IconChevronDownLine",
  "IconChevronLeftLine",
  "IconChevronRightFill",
  "IconChevronRightLine",
  "IconExclamationmarkCircleFill",
  "IconEyeSlashLine",
  "IconFaceSmileCircleFill",
  "IconHeartFill",
  "IconILowercaseSerifCircleFill",
  "IconILowercaseSerifCircleLine",
  "IconLocationpinFill",
  "IconMagnifyingglassLine",
  "IconMegaphoneFill",
  "IconMinusFatFill",
  "IconPersonCircleLine",
  "IconPlusCircleLine",
  "IconPlusFill",
  "IconPlusLine",
  "IconTagLine",
  "IconTimer_10Line",
  "IconTimer_3Line",
  "IconTrashcanLine",
  "IconWonLine",
  "IconXmarkCircleFill",
  "IconXmarkLine",
] as const;

const icons = Object.fromEntries(
  ICON_NAMES.map((name) => [name, createMonochromeIcon(name)])
) as { [K in (typeof ICON_NAMES)[number]]: ReturnType<typeof createMonochromeIcon> };

export const IconArrowClockwiseCircularFill = icons.IconArrowClockwiseCircularFill;
export const IconArrowClockwiseCircularLine = icons.IconArrowClockwiseCircularLine;
export const IconBellFill = icons.IconBellFill;
export const IconBellLine = icons.IconBellLine;
export const IconBellSlashLine = icons.IconBellSlashLine;
export const IconCalendarFill = icons.IconCalendarFill;
export const IconCarrotFill = icons.IconCarrotFill;
export const IconCheckmarkCircleFill = icons.IconCheckmarkCircleFill;
export const IconCheckmarkFatFill = icons.IconCheckmarkFatFill;
export const IconCheckmarkLine = icons.IconCheckmarkLine;
export const IconChevronDownFill = icons.IconChevronDownFill;
export const IconChevronDownLine = icons.IconChevronDownLine;
export const IconChevronLeftLine = icons.IconChevronLeftLine;
export const IconChevronRightFill = icons.IconChevronRightFill;
export const IconChevronRightLine = icons.IconChevronRightLine;
export const IconExclamationmarkCircleFill = icons.IconExclamationmarkCircleFill;
export const IconEyeSlashLine = icons.IconEyeSlashLine;
export const IconFaceSmileCircleFill = icons.IconFaceSmileCircleFill;
export const IconHeartFill = icons.IconHeartFill;
export const IconILowercaseSerifCircleFill = icons.IconILowercaseSerifCircleFill;
export const IconILowercaseSerifCircleLine = icons.IconILowercaseSerifCircleLine;
export const IconLocationpinFill = icons.IconLocationpinFill;
export const IconMagnifyingglassLine = icons.IconMagnifyingglassLine;
export const IconMegaphoneFill = icons.IconMegaphoneFill;
export const IconMinusFatFill = icons.IconMinusFatFill;
export const IconPersonCircleLine = icons.IconPersonCircleLine;
export const IconPlusCircleLine = icons.IconPlusCircleLine;
export const IconPlusFill = icons.IconPlusFill;
export const IconPlusLine = icons.IconPlusLine;
export const IconTagLine = icons.IconTagLine;
export const IconTimer_10Line = icons.IconTimer_10Line;
export const IconTimer_3Line = icons.IconTimer_3Line;
export const IconTrashcanLine = icons.IconTrashcanLine;
export const IconWonLine = icons.IconWonLine;
export const IconXmarkCircleFill = icons.IconXmarkCircleFill;
export const IconXmarkLine = icons.IconXmarkLine;
