"use client";

import { HStack, ResponsivePair, Text, VStack } from "@grapu-design/react";
import { useState } from "react";
import { ActionButton } from "grapu-design/ui/action-button";
import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "grapu-design/ui/alert-dialog";

export default function AlertDialogOnOpenChangeReason() {
  const [open, setOpen] = useState(false);
  const [openReason, setOpenReason] = useState<string | null>(null);
  const [closeReason, setCloseReason] = useState<string | null>(null);

  return (
    <VStack gap="x4" align="center">
      <AlertDialogRoot
        open={open}
        onOpenChange={(open, meta) => {
          setOpen(open);

          (open ? setOpenReason : setCloseReason)(meta?.reason ?? null);
        }}
      >
        <AlertDialogTrigger asChild>
          <ActionButton variant="neutralSolid">Open</ActionButton>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Notice</AlertDialogTitle>
            <AlertDialogDescription>
              Press ESC or click the button to close.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <ResponsivePair gap="x2">
              <AlertDialogAction variant="neutralWeak">Cancel</AlertDialogAction>
              <AlertDialogAction variant="neutralSolid">OK</AlertDialogAction>
            </ResponsivePair>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>

      <HStack gap="x4">
        <Text fontSize="t3" color="fg.neutralMuted">
          Last open reason: {openReason ?? "-"}
        </Text>
        <Text fontSize="t3" color="fg.neutralMuted">
          Last close reason: {closeReason ?? "-"}
        </Text>
      </HStack>
    </VStack>
  );
}
