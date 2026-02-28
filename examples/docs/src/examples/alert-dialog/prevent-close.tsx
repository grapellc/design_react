"use client";

import { Box, VStack } from "@seed-design/react";
import { useState } from "react";
import { ActionButton } from "seed-design/ui/action-button";
import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "seed-design/ui/alert-dialog";
import { Switch } from "seed-design/ui/switch";

export default function AlertDialogPreventClose() {
  const [preventClose, setPreventClose] = useState(true);

  return (
    <AlertDialogRoot>
      <AlertDialogTrigger asChild>
        <ActionButton variant="neutralSolid">Open</ActionButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Prevent close</AlertDialogTitle>
          <AlertDialogDescription>
            You can prevent the dialog from closing when the OK button is pressed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter asChild>
          <VStack gap="x4">
            <Box alignSelf="flex-start">
              <Switch
                size="16"
                tone="neutral"
                label="Use preventDefault"
                checked={preventClose}
                onCheckedChange={setPreventClose}
              />
            </Box>
            <AlertDialogAction
              variant="neutralSolid"
              onClick={(e) => {
                if (preventClose) {
                  e.preventDefault();
                }
              }}
            >
              OK
            </AlertDialogAction>
          </VStack>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
}
