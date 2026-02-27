'use client';
import { useSnackbarContext } from '@seed-design/react-snackbar';
import { useMemo } from 'react';

function useSnackbarAdapter() {
  const api = useSnackbarContext();
  const adapter = useMemo(
    () => ({
      visible: api.visible,
      create: (options) => {
        return api.create({
          timeout: options.timeout ?? 5e3,
          removeDelay: options.removeDelay ?? 200,
          onClose: options.onClose,
          render: options.render
        });
      },
      dismiss: api.dismiss
    }),
    [api]
  );
  return adapter;
}

export { useSnackbarAdapter };
