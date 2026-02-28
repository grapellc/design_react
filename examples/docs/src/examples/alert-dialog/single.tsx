"use client";

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

const AlertDialogSingle = () => {
  // You can set z-index dialog with "--layer-index" custom property. useful for stackflow integration.
  return (
    <AlertDialogRoot>
      <AlertDialogTrigger asChild>
        <ActionButton variant="neutralSolid">Open</ActionButton>
      </AlertDialogTrigger>
      <AlertDialogContent layerIndex={50}>
        <AlertDialogHeader>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogDescription>Provides a single choice.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction variant="neutralSolid">OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};

export default AlertDialogSingle;
