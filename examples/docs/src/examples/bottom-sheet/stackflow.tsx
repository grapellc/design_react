"use client";

import { Divider, HStack, VStack } from "@grape-design/react";
import { useActivity, useFlow, type StaticActivityComponentType } from "@stackflow/react/future";
import { useRef, useState } from "react";
import { ActionButton } from "seed-design/ui/action-button";
import {
  BottomSheetBody,
  BottomSheetContent,
  BottomSheetFooter,
  BottomSheetRoot,
} from "seed-design/ui/bottom-sheet";
import { Checkbox } from "seed-design/ui/checkbox";
import { TextField, TextFieldInput } from "seed-design/ui/text-field";
import { Switch } from "seed-design/ui/switch";
import { useActivityZIndexBase } from "@grape-design/stackflow";

declare module "@stackflow/config" {
  interface Register {
    "react/bottom-sheet/stackflow": {};
  }
}

const BottomSheetStackflow: StaticActivityComponentType<"react/bottom-sheet/stackflow"> = () => {
  const activity = useActivity();
  const { pop, push } = useFlow();
  const formRef = useRef<HTMLFormElement>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [keepMounted, setKeepMounted] = useState(false);

  const open = keepMounted
    ? activity.transitionState === "enter-active" || activity.transitionState === "enter-done"
    : activity.isActive;

  const onOpenChange = keepMounted
    ? (next: boolean) => !next && activity.isActive && pop()
    : (next: boolean) => !next && pop();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    if (!formData.get("name")) {
      setNameError("Name is required.");
      return;
    }
    setNameError(null);
    pop();
  };

  return (
    <BottomSheetRoot open={open} onOpenChange={onOpenChange}>
      <BottomSheetContent
        showHandle
        showCloseButton={false}
        title="Form"
        layerIndex={useActivityZIndexBase()}
      >
        <form ref={formRef} onSubmit={handleSubmit}>
          <BottomSheetBody>
            <VStack gap="spacingY.componentDefault">
              <TextField
                required
                showRequiredIndicator
                name="name"
                label="Name"
                description="Any name is fine."
                invalid={!!nameError}
                errorMessage={nameError}
              >
                <TextFieldInput placeholder="Enter name" />
              </TextField>
              <Checkbox
                label="Subscribe to newsletter"
                tone="neutral"
                inputProps={{ name: "subscribe" }}
              />
            </VStack>
          </BottomSheetBody>
          <BottomSheetFooter>
            <VStack gap="x4">
              <HStack gap="x2">
                <ActionButton type="button" variant="neutralWeak" onClick={pop}>
                  Close
                </ActionButton>
                <ActionButton type="submit" variant="neutralSolid" flexGrow>
                  Submit
                </ActionButton>
              </HStack>
              <Divider as="div" />
              <VStack gap="x2">
                <Switch
                  tone="neutral"
                  size="16"
                  label="Keep overlay mounted after push"
                  checked={keepMounted}
                  onCheckedChange={setKeepMounted}
                  style={{ alignSelf: "center" }}
                />
                <ActionButton
                  flexGrow
                  type="button"
                  variant="neutralSolid"
                  onClick={() => push("react/bottom-sheet/activity", {})}
                >
                  Push trigger activity
                </ActionButton>
              </VStack>
            </VStack>
          </BottomSheetFooter>
        </form>
      </BottomSheetContent>
    </BottomSheetRoot>
  );
};

export default BottomSheetStackflow;
