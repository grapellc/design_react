'use client';
import { useState, useMemo, useCallback } from 'react';
import { splitGraphemes } from 'unicode-segmenter/grapheme';
import { memoize } from './memoize.js';

const getGraphemes = (string) => Array.from(splitGraphemes(string));
const memoizedGetGraphemes = memoize(getGraphemes);
function useTextFieldWithGraphemes({
  maxGraphemeCount,
  value: controlledValue,
  defaultValue = "",
  onValueChange
}) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = controlledValue !== void 0;
  const value = isControlled ? controlledValue : uncontrolledValue;
  const graphemes = useMemo(() => memoizedGetGraphemes(value), [value]);
  const handleValueChange = useCallback(
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

export { useTextFieldWithGraphemes };
