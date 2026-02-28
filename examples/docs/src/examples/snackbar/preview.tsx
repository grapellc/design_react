"use client";

import { ActionButton } from "grapu-design/ui/action-button";
import { Snackbar, SnackbarProvider, useSnackbarAdapter } from "grapu-design/ui/snackbar";

function Component() {
  const adapter = useSnackbarAdapter();

  return (
    <ActionButton
      onClick={() =>
        adapter.create({
          timeout: 5000,
          onClose: () => {},
          render: () => <Snackbar message="Notification message" actionLabel="OK" onAction={() => {}} />,
        })
      }
    >
      Show
    </ActionButton>
  );
}

export default function SnackbarPreview() {
  return (
    <SnackbarProvider>
      <Component />
    </SnackbarProvider>
  );
}
