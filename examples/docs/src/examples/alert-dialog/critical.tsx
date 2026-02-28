"use client";

import { ResponsivePair } from "@grape-design/react";
import { ActionButton } from "grape-design/ui/action-button";
import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "grape-design/ui/alert-dialog";

const AlertDialogCritical = () => {
  return (
    // You can set z-index dialog with "--layer-index" custom property. useful for stackflow integration.
    <AlertDialogRoot>
      <AlertDialogTrigger asChild>
        <ActionButton variant="neutralSolid">Open</ActionButton>
      </AlertDialogTrigger>
      <AlertDialogContent layerIndex={50}>
        <AlertDialogHeader>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogDescription>Warns about a destructive, irreversible action.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* ResponsivePair component wraps layout if button content is too long. */}
          <ResponsivePair gap="x2">
            <AlertDialogAction variant="neutralWeak">Cancel</AlertDialogAction>
            <AlertDialogAction variant="criticalSolid">OK</AlertDialogAction>
          </ResponsivePair>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};

export default AlertDialogCritical;
