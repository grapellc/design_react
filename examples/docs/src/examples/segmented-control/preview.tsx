"use client";

import { SegmentedControl, SegmentedControlItem } from "grapu-design/ui/segmented-control";

export default function SegmentedControlPreview() {
  return (
    <SegmentedControl defaultValue="Hot" aria-label="Sort by">
      <SegmentedControlItem value="Hot">Hot</SegmentedControlItem>
      <SegmentedControlItem value="New">New</SegmentedControlItem>
    </SegmentedControl>
  );
}
