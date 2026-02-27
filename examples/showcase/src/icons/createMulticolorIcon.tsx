import { MulticolorIcon } from "./SvgIcon";

export function createMulticolorIcon(name: string) {
  const Icon = (props: React.ComponentProps<typeof MulticolorIcon>) => (
    <MulticolorIcon name={name} {...props} />
  );
  Icon.displayName = name;
  return Icon;
}
