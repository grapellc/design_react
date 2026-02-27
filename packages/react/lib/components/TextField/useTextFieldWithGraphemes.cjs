'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const React = require('react');
const grapheme = require('unicode-segmenter/grapheme');
const memoize = require('./memoize.cjs');

const getGraphemes = (string) => Array.from(grapheme.splitGraphemes(string));
const memoizedGetGraphemes = memoize.memoize(getGraphemes);
function useTextFieldWithGraphemes({
  maxGraphemeCount,
  value: controlledValue,
  defaultValue = "",
  onValueChange
}) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== void 0;
  const value = isControlled ? controlledValue : uncontrolledValue;
  const graphemes = React.useMemo(() => memoizedGetGraphemes(value), [value]);
  const handleValueChange = React.useCallback(
    (newValue) => {
      const newGraphemes = memoizedGetGraphemes(newValue);
      const newSlicedGraphemes = maxGraphemeCount === void 0 ? newGraphemes : newGraphemes.slice(0, maxGraphemeCount);
      const newSlicedValue = newSlicedGraphemes.join("");
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.({
        value: newValue,
        graphemes: newGraphemes,
        slicedValue: newSlicedValue,
        slicedGraphemes: newSlicedGraphemes
      });
    },
    [isControlled, maxGraphemeCount, onValueChange]
  );
  return {
    textFieldRootProps: {
      value,
      onValueChange: handleValueChange
    },
    counterProps: {
      current: graphemes.length,
      max: maxGraphemeCount ?? 0
    },
    graphemes
  };
}

exports.useTextFieldWithGraphemes = useTextFieldWithGraphemes;
