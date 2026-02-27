# @grape_design_react/react-dialog

## 1.0.2

### Patch Changes

- 576c2e6: `AlertDialogRoot`, `MenuSheetRoot` 및 `BottomSheetRoot`의 `onOpenChange` 두 번째 인자로 `details`를 제공합니다. `details.reason`과 `details.event`를 사용할 수 있습니다.

  `DialogAction`을 `DialogPrimitive.CloseButton`으로 교체합니다. `AlertDialogAction` `onClick` 핸들러에서 `event.preventDefault()`를 호출하여 닫기 동작을 방지할 수 있습니다. [(예제)](https://grape_design_react.io/react/components/alert-dialog#prevent-close)

- Updated dependencies [576c2e6]
  - @grape_design_react/react-use-controllable-state@1.0.0

## 1.0.1

### Patch Changes

- 69ccc6e: Overlay 컴포넌트에 skipAnimation 옵션을 추가합니다

## 1.0.0

### Major Changes

- 34f92f2: 🌱 SEED Design 패키지의 첫 메이저 버전을 출시합니다.

### Patch Changes

- Updated dependencies [34f92f2]
  - @grape_design_react/react-primitive@1.0.0
  - @grape_design_react/dom-utils@1.0.0

## 0.0.5

### Patch Changes

- Updated dependencies [29ec9f0]
  - @grape_design_react/react-primitive@0.0.3

## 0.0.4

### Patch Changes

- 7851a31: RSC 지원을 위한 "use client" directive를 추가합니다.

## 0.0.3

### Patch Changes

- e368c69: 패키지 의존성을 최신화합니다.
- Updated dependencies [e368c69]
  - @grape_design_react/react-primitive@0.0.2
  - @grape_design_react/dom-utils@0.0.2

## 0.0.2

### Patch Changes

- 09fecb9: 누락된 grape_design_react/react-primitive 의존성 추가 및 불필요한 의존성 제거

## 0.0.1

### Patch Changes

- b64023c: Initial release of the next version of Seed Design.
- Updated dependencies [b64023c]
  - @grape_design_react/dom-utils@0.0.1

## 0.0.1-rc.0

### Patch Changes

- Seed Design V3 release candidate
- Updated dependencies
  - @grape_design_react/dom-utils@0.0.1-rc.0
