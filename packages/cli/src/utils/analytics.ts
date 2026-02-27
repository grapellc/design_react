import { randomUUID } from "node:crypto";
import * as p from "@clack/prompts";
import { getRawConfig } from "./get-config";

const EVENT_PREFIX = "seed_cli";

interface TrackOptions {
  event: string;
  properties?: Record<string, unknown>;
}

/**
 * 텔레메트리 활성화 여부를 확인합니다.
 * 우선순위:
 * 1. 환경 변수 DISABLE_TELEMETRY
 * 2. 환경 변수 SEED_DISABLE_TELEMETRY
 * 3. grape_design_react.json의 telemetry 설정
 * 4. 기본값 true (Opt-out)
 */
async function isTelemetryEnabled(cwd: string): Promise<boolean> {
  // 1. 환경 변수 체크
  if (process.env.DISABLE_TELEMETRY === "true") return false;
  if (process.env.SEED_DISABLE_TELEMETRY === "true") return false;

  // 2. grape_design_react.json 체크
  try {
    const config = await getRawConfig(cwd);
    if (config?.telemetry === false) return false;
  } catch {
    // 설정 파일이 없거나 읽기 실패 시 기본값 사용
  }

  // 3. 기본값
  return true;
}

/**
 * 익명 세션 ID를 생성합니다.
 * 각 CLI 실행마다 새로운 UUID가 생성됩니다.
 */
function generateSessionId(): string {
  return randomUUID();
}

// 세션당 한 번만 생성
const sessionId = generateSessionId();

// 세션당 한 번만 메시지 표시
let hasShownMessage = false;

/**
 * PostHog에 이벤트를 전송합니다.
 */
async function track(cwd: string, { event, properties = {} }: TrackOptions): Promise<void> {
  const enabled = await isTelemetryEnabled(cwd);

  if (!enabled) {
    return;
  }

  const fullEvent = `${EVENT_PREFIX}.${event}`;

  // Dev 모드: 콘솔에만 출력
  if (process.env.NODE_ENV === "dev") {
    console.log(`📊 [Telemetry] ${fullEvent}`, properties);
    return;
  }

  // 사용자에게 텔레메트리 수집 중임을 알림 (세션당 한 번만)
  if (!hasShownMessage) {
    p.log.info(
      "📊 사용 데이터 수집 중 (비활성화: grape_design_react.json 또는 DISABLE_TELEMETRY 환경 변수)",
    );
    hasShownMessage = true;
  }

  // PostHog API 호출 (fire-and-forget)
  try {
    if (!process.env.POSTHOG_HOST || !process.env.POSTHOG_API_KEY) {
      console.warn("[Analytics] Missing POSTHOG_HOST or POSTHOG_API_KEY");
      return;
    }

    const url = `${process.env.POSTHOG_HOST}/capture`;
    const headers = {
      "Content-Type": "application/json",
    };

    const payload = {
      api_key: process.env.POSTHOG_API_KEY,
      event: fullEvent,
      distinct_id: sessionId,
      properties: {
        ...properties,
        $process_person_profile: false,
      },
      timestamp: new Date().toISOString(),
    };
    // 5초 타임아웃 설정
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
      await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }
  } catch {
    // 에러 발생 시 조용히 무시 (CLI 블로킹 방지)
  }
}

export const analytics = {
  track,
};
