import type { ComponentType } from "react";

export const exampleModules = import.meta.glob<{ default: ComponentType }>(
  "./examples/**/preview.tsx",
  { eager: false }
);

export const componentList = (() => {
  const names = new Set<string>();
  for (const path of Object.keys(exampleModules)) {
    const match = path.match(/examples\/([^/]+)\/preview\.tsx$/);
    if (match) names.add(match[1]);
  }
  return Array.from(names).sort();
})();

export function getExampleModulePath(name: string): string | undefined {
  return Object.keys(exampleModules).find((p) => p.endsWith(`/${name}/preview.tsx`));
}
