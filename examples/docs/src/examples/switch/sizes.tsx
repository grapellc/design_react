"use client";

import { VStack } from "@grapu-design/react";
import { Switch } from "grapu-design/ui/switch";

export default function SwitchSizes() {
  return (
    <VStack align="center" gap="spacingY.componentDefault">
      <Switch size="32" label="32 (default)" defaultChecked />
      <Switch size="24" label="24" defaultChecked />
      <Switch size="16" label="16" defaultChecked />
    </VStack>
  );
}
