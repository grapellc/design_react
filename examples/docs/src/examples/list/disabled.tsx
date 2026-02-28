"use client";

import {
  IconChevronRightLine,
  IconPersonCircleLine,
  IconSlashCircleLine,
} from "@karrotmarket/react-monochrome-icon";
import { Divider, Icon, VStack } from "@grape-design/react";
import { RadioGroup } from "@grape-design/react/primitive";
import { List, ListButtonItem, ListCheckItem, ListRadioItem } from "grape-design/ui/list";
import { Checkmark } from "grape-design/ui/checkbox";
import { Radiomark } from "grape-design/ui/radio-group";

export default function ListDisabled() {
  return (
    <VStack width="360px">
      <List>
        <ListButtonItem
          prefix={<Icon svg={<IconPersonCircleLine />} />}
          title="활성화된 ListButtonItem"
          detail="Cupidatat et pariatur amet."
          suffix={<Icon svg={<IconChevronRightLine />} />}
        />
      </List>
      <List as="fieldset">
        <ListCheckItem
          prefix={<Icon svg={<IconPersonCircleLine />} />}
          title="활성화된 ListCheckItem"
          suffix={<Checkmark tone="neutral" size="large" />}
        />
      </List>
      <List asChild>
        <RadioGroup.Root defaultValue="foo" aria-label="Option Select">
          <ListRadioItem
            prefix={<Icon svg={<IconPersonCircleLine />} />}
            title="활성화된 ListRadioItem"
            suffix={<Radiomark tone="neutral" size="large" />}
            value="foo"
          />
        </RadioGroup.Root>
      </List>
      <Divider />
      <List>
        <ListButtonItem
          disabled
          prefix={<Icon svg={<IconSlashCircleLine />} />}
          title="비활성화된 ListButtonItem"
          detail="Cupidatat et pariatur amet."
          suffix={<Icon svg={<IconChevronRightLine />} />}
        />
      </List>
      <List as="fieldset">
        <ListCheckItem
          disabled
          prefix={<Icon svg={<IconSlashCircleLine />} />}
          title="비활성화된 ListCheckItem"
          suffix={<Checkmark tone="neutral" size="large" />}
        />
      </List>
      <List asChild>
        <RadioGroup.Root defaultValue="foo" aria-label="Option Select">
          <ListRadioItem
            disabled
            prefix={<Icon svg={<IconSlashCircleLine />} />}
            title="비활성화된 ListRadioItem"
            suffix={<Radiomark tone="neutral" size="large" />}
            value="foo"
          />
        </RadioGroup.Root>
      </List>
    </VStack>
  );
}
