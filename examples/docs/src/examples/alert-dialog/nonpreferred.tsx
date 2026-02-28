"use client";

import { VStack } from "@grape-design/react";
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

const AlertDialogNonpreferred = () => {
  return (
    // You can set z-index dialog with "--layer-index" custom property. useful for stackflow integration.
    <AlertDialogRoot>
      <AlertDialogTrigger asChild>
        <ActionButton variant="neutralSolid">Open</ActionButton>
      </AlertDialogTrigger>
      <AlertDialogContent layerIndex={50}>
        <AlertDialogHeader>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogDescription>Provides neutral choices.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <VStack gap="x4" alignSelf="stretch">
            <AlertDialogAction size="medium" variant="neutralSolid" layout="withText">
              라벨
            </AlertDialogAction>
            <AlertDialogAction
              size="medium"
              variant="ghost"
              layout="withText"
              color="fg.neutralMuted"
              fontWeight="bold"
              bleedY="asPadding"
            >
              라벨
            </AlertDialogAction>
          </VStack>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};

export default AlertDialogNonpreferred;
