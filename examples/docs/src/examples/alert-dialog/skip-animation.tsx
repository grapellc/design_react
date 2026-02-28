"use client";

import { ResponsivePair } from "@grapu-design/react";
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

const AlertDialogSkipAnimation = () => {
  return (
    <AlertDialogRoot skipAnimation>
      <AlertDialogTrigger asChild>
        <ActionButton variant="neutralSolid">Open</ActionButton>
      </AlertDialogTrigger>
      <AlertDialogContent layerIndex={50}>
        <AlertDialogHeader>
          <AlertDialogTitle>Warning</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <ResponsivePair gap="x2">
            <AlertDialogAction variant="neutralWeak">Cancel</AlertDialogAction>
            <AlertDialogAction variant="neutralSolid">OK</AlertDialogAction>
          </ResponsivePair>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};

export default AlertDialogSkipAnimation;
