import {
  createRouter,
  createRootRoute,
  createRoute,
  redirect,
} from "@tanstack/react-router";
import { RootLayout } from "./RootLayout";
import { ExamplePreview } from "./ExamplePreview";
import { componentList } from "./exampleList";

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <div>Not found</div>,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => null,
  beforeLoad: () => {
    const first = componentList[0];
    if (first) {
      throw redirect({ to: "/$exampleName", params: { exampleName: first } });
    }
  },
});

const exampleNameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "$exampleName",
  component: ExamplePreview,
});

const routeTree = rootRoute.addChildren([indexRoute, exampleNameRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
