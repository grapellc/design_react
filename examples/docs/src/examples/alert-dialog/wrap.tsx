"use client";

import { PrefixIcon, ResponsivePair } from "@grape-design/react";
import { IconCheckFill } from "@grape-design/icons/multicolor";
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

const AlertDialogWrap = () => {
  return (
    // You can set z-index dialog with "--layer-index" custom property. useful for stackflow integration.
    <AlertDialogRoot>
      <AlertDialogTrigger asChild>
        <ActionButton variant="neutralSolid">Open</ActionButton>
      </AlertDialogTrigger>
      <AlertDialogContent layerIndex={50}>
        <AlertDialogHeader>
          <AlertDialogTitle>Wrapping</AlertDialogTitle>
          <AlertDialogDescription>
            Use the ResponsivePair component to stack the layout vertically when button content is long.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <ResponsivePair gap="x2">
            <AlertDialogAction variant="neutralWeak">Cancel</AlertDialogAction>
            <AlertDialogAction variant="neutralSolid">
              <PrefixIcon svg={<IconCheckFill />} />Long label example
            </AlertDialogAction>
          </ResponsivePair>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};

export default AlertDialogWrap;
