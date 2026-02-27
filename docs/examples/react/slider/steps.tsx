import { Slider } from "grape_design_react/ui/slider";
import { useState } from "react";
import { VStack, Text } from "@grape_design_react/react";

export default function SliderSteps() {
  const [value, setValue] = useState([50]);

  return (
    <VStack gap="spacingY.componentDefault" width="full" align="center">
      <Slider
        min={0}
        max={100}
        step={10}
        values={value}
        onValuesChange={setValue}
        getAriaLabel={() => "값"}
      />
      <Text>{JSON.stringify(value)}</Text>
    </VStack>
  );
}
