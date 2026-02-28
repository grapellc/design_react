"use client";

import { RadioGroup } from "@grape-design/react/primitive";
import { List, ListDivider, ListRadioItem } from "seed-design/ui/list";
import { Radiomark } from "seed-design/ui/radio-group";

export default function ListRadio() {
  return (
    <List width="360px" asChild>
      <RadioGroup.Root defaultValue="option1" aria-label="Option Select">
        <ListRadioItem
          value="option1"
          title="Option 1"
          detail="First choice"
          suffix={<Radiomark tone="neutral" size="large" />}
        />
        <ListDivider as="div" />
        <ListRadioItem
          prefix={<Radiomark tone="neutral" size="large" />}
          value="option2"
          title="Option 2"
          detail="Second choice"
        />
        <ListDivider as="div" />
        <ListRadioItem
          prefix={<Radiomark tone="neutral" size="large" />}
          value="option3"
          title="Option 3"
          detail="Third choice"
        />
      </RadioGroup.Root>
    </List>
  );
}
