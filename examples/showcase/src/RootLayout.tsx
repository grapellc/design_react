import React, { Suspense, lazy } from "react";
import { Box, Text } from "@grape-design/react";
import { Link, Outlet } from "@tanstack/react-router";
import { StandalonePreviewContext } from "./StandalonePreviewContext";
import { componentList } from "./exampleList";

function RootLayoutInner() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bg="bg.layerDefault"
      color="fg.neutral"
    >
      <Box p="x4" borderColor="stroke.neutralSubtle" borderBottomWidth="1">
        <Text textStyle="t2Bold">Grape Design – Examples</Text>
        <Text textStyle="t6Regular" color="fg.neutralSubtle">
          Using @grape-design/react · TanStack Router
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
            <Link
              key={name}
              to="/$exampleName"
              params={{ exampleName: name }}
              style={{
                display: "block",
                padding: "var(--spacing-x2) var(--spacing-x3)",
                borderRadius: "var(--radius-r2)",
                textDecoration: "none",
                color: "inherit",
                width: "100%",
                textAlign: "left",
                cursor: "pointer",
                border: "none",
                font: "inherit",
              }}
              activeProps={{
                style: { backgroundColor: "var(--color-bg-neutralWeak)" },
              }}
              inactiveProps={{
                style: { backgroundColor: "transparent" },
              }}
            >
              <Text textStyle="t6Regular">{name}</Text>
            </Link>
          ))}
        </Box>
        <Box flex="1" p="x6" style={{ overflowY: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export function RootLayout() {
  return (
    <StandalonePreviewContext.Provider value={true}>
      <RootLayoutInner />
    </StandalonePreviewContext.Provider>
  );
}
