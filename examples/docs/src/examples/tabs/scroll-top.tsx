"use client";

import React, { RefObject, useRef, useState } from "react";
import { TabsCarousel, TabsContent, TabsList, TabsRoot, TabsTrigger } from "grape-design/ui/tabs";

export default function TabsScrollTop() {
  const [currentTab, setCurrentTab] = useState("1");
  const contentRefs: Record<string, RefObject<HTMLSpanElement | null>> = {
    "1": useRef<HTMLSpanElement>(null),
    "2": useRef<HTMLSpanElement>(null),
  };
  const refOrUndefined = (r: RefObject<HTMLSpanElement | null>) =>
    r as React.RefObject<HTMLSpanElement>;

  const handleTriggerClick = (value: string) => {
    if (value === currentTab) {
      contentRefs[value].current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div style={{ width: "360px" }}>
      <TabsRoot triggerLayout="fill" value={currentTab} onValueChange={setCurrentTab}>
        <TabsList>
          <TabsTrigger onClick={() => handleTriggerClick("1")} value="1">
            라벨1
          </TabsTrigger>
          <TabsTrigger onClick={() => handleTriggerClick("2")} value="2">
            라벨2
          </TabsTrigger>
        </TabsList>
        <TabsCarousel swipeable>
          <TabsContent ref={refOrUndefined(contentRefs["1"])} value="1" style={{ maxHeight: "200px" }}>
            <Content height="1000px">Content 1</Content>
          </TabsContent>
          <TabsContent ref={refOrUndefined(contentRefs["2"])} value="2" style={{ maxHeight: "200px" }}>
            <Content height="1000px">Content 2</Content>
          </TabsContent>
        </TabsCarousel>
      </TabsRoot>
    </div>
  );
}

const Content = (props: React.PropsWithChildren<{ height: string }>) => {
  const { height, children } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height,
        backgroundColor: "var(--seed-color-bg-layer-default)",
      }}
    >
      {children}
    </div>
  );
};
