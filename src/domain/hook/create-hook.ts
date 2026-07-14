import type { HookData } from "../types/hook-types.ts"

export function createHook(data: HookData) {
  return {
    ...data,
    matchesTool(t: string) { return !data.tools || data.tools.includes(t) },
    matchesEvent(et: string) { return et === data.event || et === data.event.replace("session.", "") },
    isToolHook() { return data.event.startsWith("tool.") },
    isSessionHook() { return data.event.startsWith("session.") },
  }
}
