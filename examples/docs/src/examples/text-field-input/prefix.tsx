"use client";

import { IconMagnifyingglassLine } from "@karrotmarket/react-monochrome-icon";
import { HStack, VStack } from "@grape-design/react";
import { TextField, TextFieldInput } from "seed-design/ui/text-field";

export default function TextFieldInputPrefix() {
  return (
    <VStack width="full" gap="spacingY.componentDefault">
      <HStack gap="x3">
        <TextField
          label="소셜 미디어 URL"
          description="프로필이나 페이지 URL을 입력해주세요."
          prefix="https://"
        >
          <TextFieldInput placeholder="example.com" />
        </TextField>
        <TextField
          label="Search"
          description="글 제목 또는 Content으로 Search할 수 있습니다."
          prefixIcon={<IconMagnifyingglassLine />}
        >
          <TextFieldInput placeholder="레모네이드 레시피" />
        </TextField>
      </HStack>
      <HStack gap="x3">
        <TextField
          variant="underline"
          description="프로필이나 페이지 URL을 입력해주세요."
          prefix="https://"
        >
          <TextFieldInput aria-label="소셜 미디어 URL" placeholder="example.com" />
        </TextField>
        <TextField
          variant="underline"
          description="글 제목 또는 Content으로 Search할 수 있습니다."
          prefixIcon={<IconMagnifyingglassLine />}
        >
          <TextFieldInput aria-label="Search" placeholder="레모네이드 레시피" />
        </TextField>
      </HStack>
    </VStack>
  );
}
