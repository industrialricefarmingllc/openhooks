import type { HookEntry } from "../../domain/types/hook-entry.ts"
import type { SessionHookEntry } from "../../domain/types/session-hook-entry.ts"

export function mergeHooks(global: (HookEntry | SessionHookEntry)[], project: (HookEntry | SessionHookEntry)[]) {
  const ids = new Set(project.map(h => h.id).filter(Boolean))
  return [...global.filter(h => !ids.has(h.id)), ...project]
}
