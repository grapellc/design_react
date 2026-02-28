"use client";

import { ProgressCircle } from "grapu-design/ui/progress-circle";

export default function ProgressCircleDeterminate() {
  return <ProgressCircle minValue={0} maxValue={100} value={40} />;
}
