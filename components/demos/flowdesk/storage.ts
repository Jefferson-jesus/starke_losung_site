import type { DemoLocale, DemoState } from "@/components/demos/flowdesk/model";
import { assertDemoState } from "@/components/demos/flowdesk/model";
import { createSeedState } from "@/components/demos/flowdesk/seed";

export function parseDemoState(raw: string | null, locale: DemoLocale): DemoState {
  try {
    const state: unknown = JSON.parse(raw ?? "null");
    assertDemoState(state);
    return state;
  } catch {
    return createSeedState(locale);
  }
}

export function getDemoStorageKey(locale: DemoLocale): string {
  return `starke.flowdesk.demo.${locale}.v1`;
}

export function saveDemoState(storage: Pick<Storage, "setItem">, locale: DemoLocale, state: DemoState): boolean {
  try {
    storage.setItem(getDemoStorageKey(locale), JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}
