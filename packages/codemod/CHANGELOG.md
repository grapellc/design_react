# @grape_design_react/codemod

## 1.0.0

### Major Changes

- 34f92f2: 🌱 SEED Design 패키지의 첫 메이저 버전을 출시합니다.

### Patch Changes

- Updated dependencies [34f92f2]
  - @grape_design_react/migration-index@1.0.0

## 0.0.31

### Patch Changes

- 91952e4: `replace-semantic-stroke-color` transform을 추가합니다.

  - `@grape_design_react/css` v0.2.0에 맞춰 `replace-semantic-stroke-color` transform을 추가합니다.
  - `@grape_design_react/css/vars`에서 사용한 stroke 토큰을 업데이트하는 마이그레이션 코드모드를 추가합니다.

## 0.0.30

### Patch Changes

- Updated dependencies [8448880]
  - @grape_design_react/migration-index@0.0.30

## 0.0.29

### Patch Changes

- 6d6d465: replace-custom-grape_design_react-typography 사용된 객체 그대로 사용하게끔 수정합니다

## 0.0.28

### Patch Changes

- ab52481: `replace-custom-grape_design_react-typography`, `replace-custom-color-to-grape_design_react-vars-color` 로직 변경
- f801300: 새로운 black, white alpha 값 추가에 대해서 대응하고, V3로 이미 마이그레이션 된 프로젝트의 alpha 값들 변환해주는 transform을 추가합니다 (replace-alpha-color)
- Updated dependencies [f801300]
  - @grape_design_react/migration-index@0.0.28

## 0.0.27

### Patch Changes

- 7a146c2: - replace-custom-color-to-grape_design_react-vars-color 추가
  - replace-custom-grape_design_react-text-component 케이스 추가
  - replace-custom-grape_design_react-typography 케이스 추가

## 0.0.26

### Patch Changes

- 2854d72: replace-tailwind-typography가 `text-` 접두사가 붙은 className도 처리해요

## 0.0.25

### Patch Changes

- 3d7b0dc: replace-tailwind-color cva 처리 추가 및 `-seed` prefix 토큰 확인 로직 추가

## 0.0.24

### Patch Changes

- 03aaeb1: replace-stitches-styled-color 로직 강화
  - !important 처리 강화
  - color가 들어갈 수 있는 다양한 복합 포맷 대응
  - 삼항연산자 변환 대응

## 0.0.23

### Patch Changes

- 1284609: feat: replace-custom-grape_design_react-color 직접 grape_design_react/css 패키지 import 하도록 변경
- 6895bd0: feat(codemod): add more cases in stitches transform

## 0.0.22

### Patch Changes

- b89ef88: - replace-custom-grape_design_react-vars를 추가해요
  - replace-custom-imported-typography-variable를 추가해요
  - replace-custom-grape_design_react-typography를 추가해요
  - replace-custom-grape_design_react-color를 추가해요
  - replace-grape_design_react-token-typography-classname VE에서 잘 변경되지 않던 이슈를 해결해요
- 03cc680: transform logger의 이름을 transform 이름과 동일하게 수정해요
- e368c69: 패키지 의존성을 최신화합니다.

## 0.0.21

### Patch Changes

- 775db48: feat: moduleResolution: node를 추가해요

## 0.0.20

### Patch Changes

- f17f842: - stitches 관련 transform 추가
  - replace-stitches-styled-color
  - replace-stitches-styled-typography
  - replace-stitches-theme-color
  - trasnform 이름 변경
    - replace-color-design-token → replace-grape_design_react-token-vars
    - replace-color-prop → replace-custom-text-component-color-prop
    - replace-css-color-variable → replace-css-grape_design_react-color-variable
    - replace-css-typography-variable replace-css-grape_design_react-typography-variable
    - replace-tailwind-color 유지
    - replace-tailwind-typography 유지
    - replace-text-component → replace-custom-grape_design_react-text-component
    - replace-typography-design-token → replace-grape_design_react-token-typography-classname
    - replace-v2-icon → replace-react-icon
- Updated dependencies [f17f842]
  - @grape_design_react/migration-index@0.0.20

## 0.0.19

### Patch Changes

- 1cb5fcc: logging 파일 형식을 개선합니다

## 0.0.18

### Patch Changes

- 5ef19b3: feat: remove custom `--reporter` option, add `log` in all transfomers
- Updated dependencies [a7e2571]
  - @grape_design_react/migration-index@0.0.18

## 0.0.17

### Patch Changes

- 93eaaeb: feat: change spawn to execa

## 0.0.16

### Patch Changes

- 95b140f: fix: support dynamic import in ESM

## 0.0.15

### Patch Changes

- 4f465ba: - add replace-text-component transform
  - add reporter warning message
  - add more complex test case in replace-tailwind-typography
  - replace-vars-color -> replace-color-design-token
  - add replace-typography-design-token
  - add replace-css-typography-variable
- Updated dependencies [4f465ba]
  - @grape_design_react/migration-index@0.0.3

## 0.0.14

### Patch Changes

- 37c12e9: feat: replace-css-color-variable

## 0.0.13

### Patch Changes

- Updated dependencies [9f55b8f]
  - @grape_design_react/migration-index@0.0.2

## 0.0.12

### Patch Changes

- @grape_design_react/migration-index@0.0.1

## 0.0.12-rc.4

### Patch Changes

- e2423fa: add prefix in tailwind color codemod, and remove external field
- 296ce10: - add replace-color-prop transform
  - replace-color-design-token change import css to react

## 0.0.12-rc.3

### Patch Changes

- 14c9983: change package.json exports map

## 0.0.12-rc.2

### Patch Changes

- 9f40190: remove run

## 0.0.12-rc.1

### Patch Changes

- 2612bf7: remove require

## 0.0.12-rc.0

### Patch Changes

- f83bbf8: migration index, codemod (vars, tailwind)
- Updated dependencies [f83bbf8]
  - @grape_design_react/migration-index@0.0.1-rc.0

## 0.0.11

### Patch Changes

- icon_horizline2_vertical_chatbubble_rectangular_right 반영

## 0.0.10

### Patch Changes

- icon_speaker_slash 이름 변경 반영

## 0.0.9

### Patch Changes

- 멀티컬러로 이동시키던 아이콘 모노크롬으로 이동

## 0.0.8

### Patch Changes

- Yen 아이콘 신규 맵핑 반영

## 0.0.7

### Patch Changes

- Transform 정상 작동하도록 수정

## 0.0.6

### Patch Changes

- Release 0.0.6

## 0.0.6-alpha-20241114065324

### Patch Changes

- Node.js 버전 검증, git 관련 정보 수집

## 0.0.6-alpha-20241113101316

### Patch Changes

- Require Node.js 20.16

## 0.0.5

### Patch Changes

- Revert identifier-map to map old chevron_right to old chevron_right, allow turning analytics off

## 0.0.4

### Patch Changes

- map chevron_right to chevron_right_small

## 0.0.3

### Patch Changes

- Release 0.0.3

## 0.0.3-alpha-20241108080931

### Patch Changes

- track inline svgs

## 0.0.3-alpha-20241108075855

### Patch Changes

- Use write key from env

## 0.0.3-alpha-20241108073245

### Patch Changes

- Submit logs to June.so

## 0.0.3-alpha-20241108030926

### Patch Changes

- make @daangn/\* deps optional

## 0.0.3-alpha-20241108030003

### Patch Changes

- move actual icon packages to devdeps

## 0.0.2

### Patch Changes

- 멀티컬러 패키지로의 마이그레이션에 대응, @karrotmarket/karrot-ui-icon/lib/react 마이그레이션

## 0.0.2-alpha-20241031032411

### Patch Changes

- Return if importdefaultspecifiers

## 0.0.2-alpha-20241031025011

### Patch Changes

- Fix `icon_home` being replaced with `icon_window4_house`

## 0.0.2-alpha-20241031022819

### Patch Changes

- Notify inline SVGs being used

## 0.0.2-alpha-20241030021453

### Patch Changes

- Replace `@karrotmarket/karrot-ui-icon/lib/react`

## 0.0.2-alpha-20241028102047

### Patch Changes

- Migreate specific icons to the new multicolor package

## 0.0.1

### Patch Changes

- ee15292: Add codemod `migrate-icons` to help users easily migrate v2 icons to v3 ones

## 0.0.0-alpha-20241025045021

### Patch Changes

- Replace string literals

## 0.0.0-alpha-20241024093332

### Patch Changes

- refactor

## 0.0.0-alpha-20241023070021

### Patch Changes

- Keep icons that aren't available yet (categories & services)

## 0.0.0-alpha-20241022081111

### Patch Changes

- remove repeatedly printed filepath

## 0.0.0-alpha-20241022065031

### Patch Changes

- use report instead of winston to print stdout

## 0.0.0-alpha-20241022063510

### Patch Changes

- rename map to match, add tests

## 0.0.0-alpha-20241022061413

### Patch Changes

- update identifier map, warn users on action-required icons

## 0.0.0-alpha-20241021100240

### Patch Changes

- List available transforms & log selectively

## 0.0.0-alpha-20241021032759

### Patch Changes

- Update identifier map

## 0.0.0-alpha-20241020150322

### Patch Changes

- Stream logs to console

## 0.0.0-alpha-20241020144859

### Patch Changes

- Preserve comments

## 0.0.0-alpha-20241020125729

### Patch Changes

- Add prepack script

## 0.0.0-alpha-20241020124836

### Patch Changes

- Allow `--no-babel`

## 0.0.0-alpha-20241020123315

### Patch Changes

- Allow custom parser

## 0.0.0-alpha-20241020094046

### Patch Changes

- Build

## 0.0.0-alpha-20241020093300

### Patch Changes

- Run babel & exclude d.ts files

## 0.0.0-alpha-20241020090828

### Patch Changes

- Build correctly

## 0.0.0-alpha-20241020090615

### Patch Changes

- Add flag --no-babel

## 0.0.0-alpha-20241020064329

### Patch Changes

- Allow null for identifiermap target value & improve logging

## 0.0.0-alpha-20241020054343

### Patch Changes

- Remove unnecessary log files & update target package name

## 0.0.0-alpha-20241020052702

### Patch Changes

- Find transform files in the correct directory

## 0.0.0-alpha-20241020051045

### Patch Changes

- Find transform files in the correct directory

## 0.0.0-alpha-20241020044547

### Patch Changes

- Move files around

## 0.0.0-alpha-20241018101237

### Patch Changes

- Add shebang

## 0.0.0-alpha-20241018093322

### Patch Changes

- Add transform `migrate-icons`
