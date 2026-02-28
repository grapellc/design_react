"use client";

import { ActionButton, HStack, VStack } from "@grape-design/react";
import { useState } from "react";
import { Checkbox, CheckboxGroup } from "seed-design/ui/checkbox";

export default function CheckboxFieldset() {
  const [firstErrors, setFirstErrors] = useState<Record<string, string | undefined>>({});
  const [secondErrors, setSecondErrors] = useState<Record<string, string | undefined>>({});

  const handleFirstSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const fruits = formData.getAll("fruit");

    if (fruits.includes("apple")) {
      setFirstErrors({ apple: "Apple은 Select할 수 없습니다." });

      return;
    }

    setFirstErrors({});

    alert(JSON.stringify(fruits, null, 2));
  };

  const handleSecondSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const agreements = formData.getAll("agreement");

    const hasTerms = agreements.includes("terms");
    const hasPrivacy = agreements.includes("privacy");

    if (!hasTerms || !hasPrivacy) {
      setSecondErrors({
        ...(!hasTerms && { terms: "Required Item에 동의해 주세요." }),
        ...(!hasPrivacy && { privacy: "Required Item에 동의해 주세요." }),
      });
      return;
    }

    setSecondErrors({});
    alert(JSON.stringify(agreements, null, 2));
  };

  return (
    <HStack width="full" gap="x8" align="flex-start" p="x6">
      <VStack asChild gap="spacingY.componentDefault" style={{ flex: 1 }}>
        <form onSubmit={handleFirstSubmit}>
          <CheckboxGroup
            label="좋아하는 과일"
            indicator="Select"
            description="Apple을 Select하고 제출해보세요."
            errorMessage={Object.values(firstErrors).filter(Boolean).join(", ")}
          >
            <Checkbox
              label="Apple"
              tone="neutral"
              size="large"
              defaultChecked
              invalid={!!firstErrors.apple}
              inputProps={{ name: "fruit", value: "apple" }}
            />
            <Checkbox
              label="Banana"
              tone="neutral"
              size="large"
              invalid={!!firstErrors.banana}
              inputProps={{ name: "fruit", value: "banana" }}
            />
            <Checkbox
              label="Orange"
              tone="neutral"
              size="large"
              invalid={!!firstErrors.orange}
              inputProps={{ name: "fruit", value: "orange" }}
            />
          </CheckboxGroup>
          <ActionButton type="submit" variant="neutralSolid">
            제출
          </ActionButton>
        </form>
      </VStack>

      <VStack asChild gap="spacingY.componentDefault" style={{ flex: 1 }}>
        <form onSubmit={handleSecondSubmit}>
          <CheckboxGroup
            label="약관 동의"
            labelWeight="bold"
            showRequiredIndicator
            description="이용약관을 Select하지 않고 제출해보세요."
            errorMessage={Object.values(secondErrors).filter(Boolean).join(", ")}
          >
            <Checkbox
              label="이용약관 동의 (Required)"
              tone="neutral"
              size="large"
              invalid={!!secondErrors.terms}
              inputProps={{ name: "agreement", value: "terms" }}
            />
            <Checkbox
              label="개인정보 처리방침 동의 (Required)"
              tone="neutral"
              size="large"
              defaultChecked
              invalid={!!secondErrors.privacy}
              inputProps={{ name: "agreement", value: "privacy" }}
            />
            <Checkbox
              label="마케팅 수신 동의 (Select)"
              tone="neutral"
              size="large"
              invalid={!!secondErrors.marketing}
              inputProps={{ name: "agreement", value: "marketing" }}
            />
          </CheckboxGroup>
          <ActionButton type="submit" variant="neutralSolid">
            제출
          </ActionButton>
        </form>
      </VStack>
    </HStack>
  );
}
