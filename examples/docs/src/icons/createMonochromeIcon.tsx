import { MonochromeIcon } from "./SvgIcon";

export function createMonochromeIcon(name: string) {
  const Icon = (props: Omit<React.ComponentProps<typeof MonochromeIcon>, 'name'>) => (
    <MonochromeIcon name={name} {...props} />
  );
  Icon.displayName = name;
  return Icon;
}
