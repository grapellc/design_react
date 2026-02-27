import { readFileSync } from "fs";

// ===== 타입 정의 =====
interface ToolUseInput {
  session_id: string;
  cwd: string;
  tool_name: string;
  tool_input: {
    filePath?: string;
    path?: string;
    file_path?: string;
    [key: string]: unknown;
  };
}

// ===== 생성 파일 패턴 =====
const GENERATED_FILE_PATTERNS: Array<{
  pattern: RegExp;
  source: string;
  regenerateCommand: string;
}> = [
  {
    pattern: /packages\/css\/(vars|recipes|theming)\/.*/,
    source: "packages/rootage/ 또는 packages/qvism-preset/",
    regenerateCommand: "bun generate:all",
  },
  {
    pattern: /packages\/css\/.*\.(css|min\.css)$/,
    source: "packages/qvism-preset/",
    regenerateCommand: "bun generate:all",
  },
  {
    pattern: /packages\/qvism-preset\/src\/vars\/.*/,
    source: "packages/rootage/",
    regenerateCommand: "bun generate",
  },
  {
    pattern: /docs\/registry\/.*\.json$/,
    source: "docs/registry/*.ts",
    regenerateCommand: "bun --filter @grape_design_react/docs generate:registry",
  },
  {
    pattern: /.*\/dist\/.*/,
    source: "해당 패키지 소스",
    regenerateCommand: "bun build",
  },
  {
    pattern: /.*\/__generated__\/.*/,
    source: "생성 스크립트",
    regenerateCommand: "해당 generate 스크립트",
  },
];

// ===== 메인 로직 =====
try {
  // 1. stdin에서 입력 읽기
  const input: ToolUseInput = JSON.parse(readFileSync(0, "utf-8"));

  // 2. Write 또는 Edit 도구인지 확인
  const isWriteTool = ["Write", "Edit", "MultiEdit"].includes(input.tool_name);
  if (!isWriteTool) {
    process.exit(0);
  }

  // 3. 파일 경로 추출
  const filePath = input.tool_input.filePath || input.tool_input.path || input.tool_input.file_path;
  if (!filePath || typeof filePath !== "string") {
    process.exit(0);
  }

  for (const { pattern, source, regenerateCommand } of GENERATED_FILE_PATTERNS) {
    if (pattern.test(filePath)) {
      const message = `
╔════════════════════════════════════════════════════════════╗
║  ⛔ 생성 파일 수정 감지                                    ║
╚════════════════════════════════════════════════════════════╝

수정하려는 파일:
  ${filePath}

이 파일은 자동 생성됩니다.
직접 수정하지 말고 소스를 수정하세요:
  → ${source}

재생성 명령어:
  $ ${regenerateCommand}

💡 @generated-files-guard 스킬을 참고하세요.
`;

      console.error(message);
      process.exit(2);
    }
  }
} catch {
  // 에러 시 조용히 처리하여 hook이 실행을 방해하지 않도록
}
