import type { HookEntry } from "../../domain/types/hook-entry.ts"
import type { SessionHookEntry } from "../../domain/types/session-hook-entry.ts"

export const mergeHooks = (
  global: (HookEntry | SessionHookEntry)[],
  project: (HookEntry | SessionHookEntry)[]
): (HookEntry | SessionHookEntry)[] => {
  const ids = new Set(project.map(h => h.id).filter(Boolean))
  const filtered = global.filter(h => !ids.has(h.id))

  return [...filtered, ...project]
}
