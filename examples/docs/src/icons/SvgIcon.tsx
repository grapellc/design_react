import type { SVGProps } from "react";
import { iconNameToFilename } from "./iconNameToFilename";

const ICONS_BASE = "/icons";

export interface SvgIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

interface MonochromeIconProps extends SvgIconProps {
  name: string;
}

export function MonochromeIcon({ name, size = 24, ...rest }: MonochromeIconProps) {
  const filename = `${iconNameToFilename(name)}.svg`;
  const src = `${ICONS_BASE}/monochrome/${filename}`;
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)}
    />
  );
}

interface MulticolorIconProps extends SvgIconProps {
  name: string;
}

export function MulticolorIcon({ name, size = 24, ...rest }: MulticolorIconProps) {
  const baseName = iconNameToFilename(name);
  const filename = `${baseName}.svg`;
  const src = `${ICONS_BASE}/multicolor/${filename}`;
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)}
    />
  );
}
