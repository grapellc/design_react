"use client";

import { List, ListCheckItem, ListRadioItem } from "grapu-design/ui/list";
import { ListHeader } from "grapu-design/ui/list-header";
import { Checkmark } from "grapu-design/ui/checkbox";
import { Radiomark } from "grapu-design/ui/radio-group";
import { HStack, VStack } from "@grapu-design/react";
import { RadioGroup } from "@grapu-design/react/primitive";

export default function ListBorderRadius() {
  return (
    <HStack
      gap="x4"
      bg="bg.layerBasement"
      width="full"
      grow
      wrap
      align="center"
      justify="center"
      p="x4"
    >
      <VStack
        width="300px"
        py="x1_5"
        borderRadius="r3_5"
        bg="bg.layerDefault"
        borderWidth={1}
        borderColor="stroke.neutralWeak"
      >
        <ListHeader as="h2">카드 borderRadius: r3_5</ListHeader>
        <List as="fieldset" itemBorderRadius="r2">
          <ListCheckItem
            defaultChecked
            title="borderRadius: r2"
            suffix={<Checkmark size="large" tone="neutral" />}
          />
          <ListCheckItem
            title="borderRadius: r2"
            suffix={<Checkmark size="large" tone="neutral" />}
          />
        </List>
      </VStack>
      <VStack
        width="300px"
        px="x1"
        py="x2_5"
        borderRadius="22px"
        bg="bg.layerDefault"
        borderWidth={1}
        borderColor="stroke.neutralWeak"
      >
        <ListHeader as="h2">카드 borderRadius: 22px</ListHeader>
        <List asChild itemBorderRadius="r3">
          <RadioGroup.Root defaultValue="0" aria-label="Border radius options">
            <ListRadioItem
              value="0"
              title="borderRadius: r3"
              suffix={<Radiomark size="large" tone="neutral" />}
            />
            <ListRadioItem
              value="1"
              title="borderRadius: r3"
              suffix={<Radiomark size="large" tone="neutral" />}
            />
          </RadioGroup.Root>
        </List>
      </VStack>
    </HStack>
  );
}
