"use client";

import { ActionButton, HStack, VStack } from "@grapu-design/react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "grapu-design/ui/radio-group";

export default function RadioGroupRadioGroupField() {
  const [firstErrorMessage, setFirstErrorMessage] = useState<string | undefined>();
  const [secondErrorMessage, setSecondErrorMessage] = useState<string | undefined>();

  const handleFirstSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const contact = formData.get("contact");

    if (contact === "email") {
      setFirstErrorMessage("이메일은 Select할 수 없습니다.");

      return;
    }

    setFirstErrorMessage(undefined);

    alert(JSON.stringify({ contact }, null, 2));
  };

  const handleSecondSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const option = formData.get("option");

    if (option === "option1") {
      setSecondErrorMessage("Option 1은 Select할 수 없습니다.");

      return;
    }

    setSecondErrorMessage(undefined);

    alert(JSON.stringify({ option }, null, 2));
  };

  return (
    <HStack width="full" gap="x8" align="flex-start" p="x6">
      <VStack asChild gap="spacingY.componentDefault" style={{ flex: 1 }}>
        <form onSubmit={handleFirstSubmit}>
          <RadioGroup
            label="선호하는 연락 방법"
            indicator="Required"
            description="이메일을 Select하고 제출해보세요."
            name="contact"
            defaultValue="email"
            invalid={!!firstErrorMessage}
            errorMessage={firstErrorMessage}
          >
            <RadioGroupItem value="email" label="이메일" tone="neutral" size="large" />
            <RadioGroupItem value="phone" label="전화" tone="neutral" size="large" />
            <RadioGroupItem value="sms" label="문자" tone="neutral" size="large" />
          </RadioGroup>
          <ActionButton type="submit" variant="neutralSolid">
            제출
          </ActionButton>
        </form>
      </VStack>

      <VStack asChild gap="spacingY.componentDefault" style={{ flex: 1 }}>
        <form onSubmit={handleSecondSubmit}>
          <RadioGroup
            label="Required Select"
            labelWeight="bold"
            showRequiredIndicator
            description="Option 1을 Select하고 제출해보세요."
            name="option"
            defaultValue="option1"
            invalid={!!secondErrorMessage}
            errorMessage={secondErrorMessage}
          >
            <RadioGroupItem value="option1" label="Option 1" tone="neutral" size="large" />
            <RadioGroupItem value="option2" label="Option 2" tone="neutral" size="large" disabled />
            <RadioGroupItem value="option3" label="Option 3" tone="neutral" size="large" />
          </RadioGroup>
          <ActionButton type="submit" variant="neutralSolid">
            제출
          </ActionButton>
        </form>
      </VStack>
    </HStack>
  );
}
