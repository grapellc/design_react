import { MonochromeIcon } from "./SvgIcon";

export function createMonochromeIcon(name: string) {
  const Icon = (props: React.ComponentProps<typeof MonochromeIcon>) => (
    <MonochromeIcon name={name} {...props} />
  );
  Icon.displayName = name;
  return Icon;
}
