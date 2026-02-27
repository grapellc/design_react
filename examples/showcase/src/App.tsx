import React, { Suspense, lazy, useState } from "react";
import { Box, Text } from "@grape-design/react";
import { StandalonePreviewContext } from "./StandalonePreviewContext";

const exampleModules = import.meta.glob<{ default: React.ComponentType }>(
  "./examples/**/preview.tsx",
  { eager: false }
);

const componentList = (() => {
  const names = new Set<string>();
  for (const path of Object.keys(exampleModules)) {
    const match = path.match(/examples\/([^/]+)\/preview\.tsx$/);
    if (match) names.add(match[1]);
  }
  return Array.from(names).sort();
})();

function App() {
  const [selected, setSelected] = useState<string | null>(componentList[0] ?? null);

  const modulePath = Object.keys(exampleModules).find((p) =>
    p.endsWith(`/${selected}/preview.tsx`)
  );
  const PreviewComponent = selected && modulePath
    ? lazy(exampleModules[modulePath])
    : null;

  return (
    <StandalonePreviewContext.Provider value={true}>
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bg="bg.layerDefault"
      color="fg.neutral"
    >
      <Box p="x4" borderColor="stroke.neutralSubtle" borderBottomWidth="1">
        <Text textStyle="t2Bold">Grape Design – Examples (from seed-design/docs)</Text>
        <Text textStyle="t6Regular" color="fg.neutralSubtle">
          Using @grape-design/react
        </Text>
      </Box>
      <Box display="flex" flex="1" overflow="hidden">
        <Box
          as="nav"
          width="240px"
          flexShrink={0}
          p="x3"
          borderRightWidth="1"
          borderColor="stroke.neutralSubtle"
          style={{ overflowY: "auto" }}
        >
          {componentList.map((name) => (
            <Box
              key={name}
              as="button"
              type="button"
              onClick={() => setSelected(name)}
              px="x3"
              py="x2"
              borderRadius="r2"
              bg={selected === name ? "bg.neutralWeak" : "transparent"}
              style={{
                width: "100%",
                textAlign: "left",
                cursor: "pointer",
                border: "none",
                font: "inherit",
              }}
            >
              <Text textStyle="t6Regular">{name}</Text>
            </Box>
          ))}
        </Box>
        <Box flex="1" p="x6" style={{ overflowY: "auto" }}>
          {PreviewComponent && (
            <Suspense fallback={<Text textStyle="t5Regular">Loading…</Text>}>
              <PreviewComponent />
            </Suspense>
          )}
        </Box>
      </Box>
    </Box>
    </StandalonePreviewContext.Provider>
  );
}

export default App;
