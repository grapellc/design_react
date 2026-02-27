import React, { Suspense, lazy } from "react";
import { Text } from "@grape-design/react";
import { useParams } from "@tanstack/react-router";
import { exampleModules, getExampleModulePath } from "./exampleList";

function ExamplePreviewInner() {
  const { exampleName } = useParams({ strict: false });
  const modulePath = exampleName ? getExampleModulePath(exampleName) : undefined;
  const loader = modulePath ? exampleModules[modulePath] : undefined;
  const PreviewComponent = loader ? lazy(loader as () => Promise<{ default: React.ComponentType }>) : null;

  if (!exampleName || !PreviewComponent) {
    return (
      <Text textStyle="t5Regular" color="fg.neutralSubtle">
        {exampleName ? `Example "${exampleName}" not found.` : "Select an example."}
      </Text>
    );
  }

  return (
    <Suspense fallback={<Text textStyle="t5Regular">Loading…</Text>}>
      <PreviewComponent />
    </Suspense>
  );
}

export function ExamplePreview() {
  return <ExamplePreviewInner />;
}
