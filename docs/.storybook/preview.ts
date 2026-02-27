// import Seed Design
import "@grape_design_react/css/all.css";

import type { Preview } from "@storybook/nextjs";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
