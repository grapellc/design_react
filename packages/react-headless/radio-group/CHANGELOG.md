# @grape_design_react/react-radio-group

## 1.1.0

### Minor Changes

- 98dbac4: [Checkbox](/react/components/checkbox) 관련 컴포넌트를 추가합니다.

  - `CheckboxGroup` snippet 컴포넌트가 추가되었습니다. 사용하려면 snippet을 다시 내려받아 주세요.
    - `npx @grape_design_react/cli@latest add ui:checkbox`
    - `CheckboxGroup`은 자체적으로 gap과 100% width를 갖습니다. `VStack`을 사용하여 `Checkbox`를 묶지 않아도 됩니다.
      - 기존 `Checkbox`를 `CheckboxGroup`으로 감쌀 필요는 없습니다. `CheckboxGroup`은 선택적으로 사용할 수 있습니다.
    - `label`, `description`, `errorMessage`, `indicator`, `showRequiredIndicator`, `labelWeight` prop을 사용할 수 있습니다.

  [Radio Group](/react/components/radio-group) 관련 컴포넌트를 업데이트합니다.

  - **1.1 → 1.2 업그레이드 시 snippet 업데이트 필요**: `RadioGroup` snippet의 내부 구조가 변경되었습니다. snippet을 다시 내려받아 주세요.

    - `npx @grape_design_react/cli@latest add ui:radio-group`
    - `RadioGroup`이 자체적으로 gap과 100% width를 갖습니다. `VStack`을 사용하여 `RadioGroupItem`을 묶는 코드를 제거합니다.
      - **1.1 → 1.2 업그레이드 시 변경 필요**: `RadioGroupItem`을 묶어서 사용하던 `VStack`을 제거하여 `RadioGroupItem`이 `RadioGroup`의 direct child가 되도록 변경하세요.
    - `label`, `description`, `errorMessage`, `indicator`, `showRequiredIndicator`, `labelWeight` prop을 사용할 수 있습니다.
    - `@grape_design_react/react`의 `RadioGroup.Root`를 레이아웃 컴포넌트로 변경합니다.
      - `@grape_design_react/react`에서 직접 import해서 사용하는 코드가 있다면 `RadioGroup.Root`를 `@grape_design_react/react/primitive`의 `RadioGroup.Root`로 변경해주세요.

    ```tsx
    // 전
    import { VStack } from "@grape_design_react/react";
    import { RadioGroup, RadioGroupItem } from "grape_design_react/ui/radio-group";

    <RadioGroup defaultValue="apple" aria-label="Fruit selection">
      <VStack>
        <RadioGroupItem value="apple" label="Apple" />
        <RadioGroupItem value="banana" label="Banana" />
      </VStack>
    </RadioGroup>;
    ```

    ```tsx
    // 후
    import { RadioGroup, RadioGroupItem } from "grape_design_react/ui/radio-group";

    {
      /* aria-label 대신 label을 사용하여 시각적으로 레이블을 표시할 수도 있습니다. */
    }
    <RadioGroup defaultValue="apple" aria-label="Fruit selection">
      <RadioGroupItem value="apple" label="Apple" />
      <RadioGroupItem value="banana" label="Banana" />
    </RadioGroup>;
    ```

    ```tsx
    // 전
    import { RadioGroup } from "@grape_design_react/react";
    import { ListRadioItem } from "grape_design_react/ui/list";

    <RadioGroup.Root
      value={value}
      onValueChange={onValueChange}
      aria-label="옵션 선택"
    >
      <ListRadioItem
        value="option1"
        title="옵션 1"
        detail="첫 번째 선택지"
        suffix={<Radiomark tone="neutral" size="large" />}
      />
    </RadioGroup.Root>;
    ```

    ```tsx
    // 후
    import { RadioGroup } from "@grape_design_react/react/primitive";
    import { ListRadioItem } from "grape_design_react/ui/list";

    <RadioGroup.Root
      value={value}
      onValueChange={onValueChange}
      aria-label="옵션 선택"
    >
      <ListRadioItem
        value="option1"
        title="옵션 1"
        detail="첫 번째 선택지"
        suffix={<Radiomark tone="neutral" size="large" />}
      />
    </RadioGroup.Root>;
    ```

  RadioGroupItem, RadioChipItem, RadioSelectBoxItem, ListRadioItem에서 `invalid` prop이 제거되었습니다.

  - **1.1 → 1.2 업그레이드 시 확인 필요**: `invalid` 상태는 group/field 레벨에서 설정해주세요. 각 항목을 `data-invalid` 속성으로 스타일링하는 경우 확인이 필요합니다.

- 2643d17: [Select Box](/react/components/select-box) 관련 컴포넌트를 업데이트합니다.

  - **1.1 → 1.2 업그레이드 시 snippet을 다시 내려받아 주세요.**
    - `npx @grape_design_react/cli@latest add ui:select-box`
  - `CheckSelectBoxGroup`, `RadioSelectBoxRoot`의 children이 기본적으로 gap이 포함된 그리드 레이아웃으로 정렬됩니다.
    - **1.1 → 1.2 업그레이드 시 변경 필요**: `CheckSelectBox`, `RadioSelectBoxItem`을 묶어서 사용하던 `VStack`을 제거하여 `CheckSelectBox`와 `RadioSelectBoxItem`이 `CheckSelectBoxGroup` 또는 `RadioSelectBoxRoot`의 direct child가 되도록 변경하세요. `VStack`에 `gap` 이외의 스타일이 적용된 경우 `<VStack paddingX="x4"><CheckSelectBoxGroup>...</CheckSelectBoxGroup></VStack>`와 같이 `VStack`을 외부에 남겨두세요.
    - **기능 추가**: `CheckSelectBoxGroup`와 `RadioSelectBoxRoot`에 `columns`를 지정할 수 있습니다. `columns`가 `2` 이상인 경우 하위 항목에 기본적으로 `layout="vertical"`이 적용됩니다. 기본 `layout`은 하위 항목에서 오버라이드할 수 있습니다.
    - **기능 추가**: `CheckSelectBoxGroup`과 `RadioSelectBoxRoot`에 `label`, `description`, `errorMessage`, `indicator` 등 Fieldset 관련 prop을 사용할 수 있습니다.
  - **1.1 → 1.2 업그레이드 시 변경 필요**: `CheckSelectBox`, `RadioSelectBoxItem`에 기본적으로 표시되던 `Checkmark`와 `RadioMark`가 이제 표시되지 않습니다. `suffix` prop을 통해 선택적으로 추가할 수 있습니다.
    - 단순 마이그레이션 시 `suffix={<CheckSelectBoxCheckmark />}`와 `suffix={<RadioSelectBoxRadiomark />}`를 추가하세요.
  - **기능 추가**: `prefixIcon`, `footer`, `footerVisibility` prop 추가
    - `footer`에 넣는 요소는 기본적으로 해당 `CheckSelectBox` 또는 `RadioSelectBoxItem`가 선택된 상태일 때 표시됩니다. `footerVisibility="always"`를 설정하여 footer 요소를 항상 표시할 수 있습니다.
  - `label`이 기본적으로 가로 나열되며 `$dimension.x2` gap을 갖는 flex container로 변경되었습니다.
    - **1.1 → 1.2 업그레이드 시 확인 권장**: `label={<HStack gap="x2">{/* ... */}</HStack>}`와 같은 코드는 `HStack`을 `Fragment` 등으로 대체할 수 있습니다.
  - **문제 수정**: `CheckSelectBox`와 `RadioSelectBoxItem`에서 사용되지 않는 `children`을 타입 정의에서 제거합니다.
  - `CheckSelectBoxGroup`에 `label`, `aria-label`, `aria-labelledby` 중 아무것도 설정하지 않은 경우 경고를 표시합니다. (`RadioSelectBoxRoot`는 기존에도 표시)

### Patch Changes

- Updated dependencies [cfd2df4]
  - @grape_design_react/react-fieldset@0.1.0

## 1.0.1

### Patch Changes

- ae1b768: :focus-visible selector를 사용하기 전 브라우저에서 selector를 지원하는지 확인합니다.
- Updated dependencies [ae1b768]
  - @grape_design_react/react-supports@0.0.1

## 1.0.0

### Major Changes

- 34f92f2: 🌱 SEED Design 패키지의 첫 메이저 버전을 출시합니다.

### Patch Changes

- Updated dependencies [34f92f2]
  - @grape_design_react/react-primitive@1.0.0
  - @grape_design_react/dom-utils@1.0.0

## 0.0.4

### Patch Changes

- Updated dependencies [29ec9f0]
  - @grape_design_react/react-primitive@0.0.3

## 0.0.3

### Patch Changes

- 7851a31: RSC 지원을 위한 "use client" directive를 추가합니다.

## 0.0.2

### Patch Changes

- e368c69: 패키지 의존성을 최신화합니다.
- Updated dependencies [e368c69]
  - @grape_design_react/react-primitive@0.0.2
  - @grape_design_react/dom-utils@0.0.2

## 0.0.1

### Patch Changes

- b64023c: Initial release of the next version of Seed Design.
- Updated dependencies [b64023c]
  - @grape_design_react/react-primitive@0.0.1
  - @grape_design_react/dom-utils@0.0.1

## 0.0.1-rc.0

### Patch Changes

- Seed Design V3 release candidate
- Updated dependencies
  - @grape_design_react/react-primitive@0.0.1-rc.0
  - @grape_design_react/dom-utils@0.0.1-rc.0

## 0.0.0-alpha-20241030023710

### Patch Changes

- alpha
- Updated dependencies
  - @grape_design_react/dom-utils@0.0.0-alpha-20241030023710

## 0.0.0-alpha-20241004093556

### Patch Changes

- Updated dependencies
  - @grape_design_react/dom-utils@0.0.0-alpha-20241004093556
