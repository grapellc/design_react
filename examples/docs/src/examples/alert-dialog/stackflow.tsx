"use client";

import { ResponsivePair, VStack } from "@grape-design/react";
import { useActivity, useFlow, type StaticActivityComponentType } from "@stackflow/react/future";
import { useState } from "react";
import { ActionButton } from "grape-design/ui/action-button";
import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogRoot,
  AlertDialogTitle,
} from "grape-design/ui/alert-dialog";
import { Switch } from "grape-design/ui/switch";
import { useActivityZIndexBase } from "@grape-design/stackflow";

declare module "@stackflow/config" {
  interface Register {
    "react/alert-dialog/stackflow": {};
  }
}

const AlertDialogStackflow: StaticActivityComponentType<"react/alert-dialog/stackflow"> = () => {
  const activity = useActivity();
  const { pop, push } = useFlow();
  const [keepMounted, setKeepMounted] = useState(false);

  const open = keepMounted
    ? activity.transitionState === "enter-active" || activity.transitionState === "enter-done"
    : activity.isActive;

  const onOpenChange = keepMounted
    ? (next: boolean) => !next && activity.isActive && pop()
    : (next: boolean) => !next && pop();

  return (
    <AlertDialogRoot open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent layerIndex={useActivityZIndexBase()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogDescription>
            When closed, this activity is popped. Toggle “Keep mounted” to preserve state when
            pushing another activity.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <VStack gap="x4">
            <ResponsivePair gap="x2">
              <AlertDialogAction asChild>
                <ActionButton variant="neutralWeak">Confirm</ActionButton>
              </AlertDialogAction>
              <ActionButton
                variant="neutralSolid"
                onClick={() => push("react/alert-dialog/activity", {})}
              >
                Push
              </ActionButton>
            </ResponsivePair>
            <Switch
              tone="neutral"
              size="16"
              label="Keep overlay mounted after push"
              checked={keepMounted}
              onCheckedChange={setKeepMounted}
              style={{ alignSelf: "center" }}
            />
          </VStack>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};

export default AlertDialogStackflow;
