import { MulticolorIcon } from "./SvgIcon";

export function createMulticolorIcon(name: string) {
  const Icon = (props: Omit<React.ComponentProps<typeof MulticolorIcon>, 'name'>) => (
    <MulticolorIcon name={name} {...props} />
  );
  Icon.displayName = name;
  return Icon;
}
