import { HStack, Text, VStack } from "@grape_design_react/react";
import { Switch } from "@grape_design_react/react/primitive";
import { Switchmark } from "grape_design_react/ui/switch";

function CustomSwitch({ children, ...props }: Switch.RootProps) {
  return (
    <VStack asChild gap="x2" align="center">
      <Switch.Root {...props}>
        <Switchmark />
        <Switch.HiddenInput />
        {children}
      </Switch.Root>
    </VStack>
  );
}

export default function () {
  return (
    <HStack gap="x6">
      <CustomSwitch>
        <Text textStyle="t7Regular">regular</Text>
      </CustomSwitch>
      <CustomSwitch defaultChecked>
        <Text textStyle="t7Medium">medium</Text>
      </CustomSwitch>
      <CustomSwitch>
        <Text textStyle="t7Bold">bold</Text>
      </CustomSwitch>
    </HStack>
  );
}
