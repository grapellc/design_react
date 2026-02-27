import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const showcaseRoot = __dirname;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "seed-design/ui", replacement: path.join(showcaseRoot, "src/registry") },
      { find: "@karrotmarket/react-monochrome-icon", replacement: "@grape-design/icons/monochrome" },
      {
        find: /^@karrotmarket\/react-monochrome-icon\/(.+)$/,
        replacement: "@grape-design/icons/monochrome/$1",
      },
      { find: "@karrotmarket/react-multicolor-icon", replacement: "@grape-design/icons/multicolor" },
    ],
  },
  server: {
    port: 5174,
  },
});
