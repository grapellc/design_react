'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const reactSnackbar = require('@seed-design/react-snackbar');
const React = require('react');

function useSnackbarAdapter() {
  const api = reactSnackbar.useSnackbarContext();
  const adapter = React.useMemo(
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

exports.useSnackbarAdapter = useSnackbarAdapter;
