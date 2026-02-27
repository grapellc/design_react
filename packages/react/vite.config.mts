import react from "@vitejs/plugin-react";
import { globbySync } from "globby";
import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  logLevel: "warn",
  plugins: [
    dts({
      entryRoot: "src",
      staticImport: true,
      skipDiagnostics: true,
      exclude: ["**/*.test.tsx", "**/*.test.ts"],
    }),
    react(),
  ],
  build: {
    target: "esnext",
    minify: false,
    lib: {
      entry: globbySync(["src/**/index.ts", "src/vars.ts", "src/primitive.ts"]).filter(
        (f) => !f.includes(".test.")
      ),
    },
    outDir: "lib",
    rollupOptions: {
      logLevel: "silent",
      external: [
        ...Object.keys(pkg.dependencies ?? {}),
        ...Object.keys(pkg.peerDependencies ?? {}),
        /^@grape-design\/css\/.+/,
        /^@seed-design\/css\/.+/,
        /^unicode-segmenter\/.+/,
        "react/jsx-runtime",
      ],
      output: [
        {
          format: "cjs",
          preserveModules: true,
          preserveModulesRoot: "src",
          exports: "named",
          entryFileNames: "[name].cjs",
          banner: ({ fileName }) => renderBanner(fileName),
        },
        {
          format: "es",
          preserveModules: true,
          preserveModulesRoot: "src",
          exports: "named",
          entryFileNames: "[name].js",
          banner: ({ fileName }) => renderBanner(fileName),
        },
      ],
    },
  },
});

function renderBanner(fileName: string): string {
  const file = path.parse(fileName);
  if (["index", "primitive", "vars"].includes(file.name)) return "";
  if (file.name.includes("namespace")) return "";
  return "'use client';";
}
