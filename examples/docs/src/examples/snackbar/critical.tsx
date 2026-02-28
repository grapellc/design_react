"use client";

import { ActionButton } from "grapu-design/ui/action-button";
import { Snackbar, SnackbarProvider, useSnackbarAdapter } from "grapu-design/ui/snackbar";

function Component() {
  const adapter = useSnackbarAdapter();

  return (
    <ActionButton
      onClick={() =>
        adapter.create({
          timeout: 50000000,
          onClose: () => {},
          render: () => (
            <Snackbar
              variant="critical"
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

export default function SnackbarNegative() {
  return (
    <SnackbarProvider>
      <Component />
    </SnackbarProvider>
  );
}
