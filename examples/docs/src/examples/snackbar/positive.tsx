"use client";

import { ActionButton } from "seed-design/ui/action-button";
import { Snackbar, SnackbarProvider, useSnackbarAdapter } from "seed-design/ui/snackbar";

function Component() {
  const adapter = useSnackbarAdapter();

  return (
    <ActionButton
      onClick={() =>
        adapter.create({
          timeout: 5000,
          onClose: () => {},
          render: () => (
            <Snackbar
              variant="positive"
              message="Notice 메세지"
              actionLabel="OK"
              onAction={() => {}}
            />
          ),
        })
      }
    >
      실행
    </ActionButton>
  );
}

export default function SnackbarPositive() {
  return (
    <SnackbarProvider>
      <Component />
    </SnackbarProvider>
  );
}
