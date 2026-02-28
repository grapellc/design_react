"use client";

import type { RegisteredActivityName } from "@stackflow/config";
import type { ActivityComponentType } from "@stackflow/react/future";
import { useMemo } from "react";
import { makeStack } from "./Stack";

interface StackflowProps {
  activities: {
    name: RegisteredActivityName;
    component: ActivityComponentType<RegisteredActivityName>;
  }[];
}

const getActivitiesKey = (activities: { name: string }[]) =>
  activities.map((a) => a.name).join(",");

export function Stackflow({ activities }: StackflowProps) {
  const activitiesKey = getActivitiesKey(activities);
  const { Stack } = useMemo(
    () => makeStack({ activities }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only recreate when activity names change
    [activitiesKey],
  );

  return (
    <div className="not-prose example-reset my-12 flex w-full justify-center">
      <div
        className="relative h-[640px] w-full max-w-[360px] overflow-x-hidden overflow-y-hidden rounded-lg border border-fd-border"
        style={{
          transform: "translate3d(0, 0, 0)",
          maskImage: "-webkit-radial-gradient(white, black)",
        }}
      >
        <Stack />
      </div>
    </div>
  );
}
