import type { HooksConfig } from "../../domain/types/hooks-config.ts"
import type { HookEntry } from "../../domain/types/hook-entry.ts"
import type { SessionHookEntry } from "../../domain/types/session-hook-entry.ts"

export function partitionEntries(config: HooksConfig) {
  const toolHooks: Record<string, (HookEntry & { tools?: string[] })[]> = {}
  const sessionHooks: SessionHookEntry[] = []

  for (const entry of config.hooks) {
    const isToolEvent = entry.event.startsWith("tool.")

    if (isToolEvent) {
      const hasBucket = toolHooks[entry.event]
      if (!hasBucket) toolHooks[entry.event] = []

      toolHooks[entry.event]!.push(entry as HookEntry & { tools?: string[] })
      continue
    }

    const isSessionEvent = entry.event.startsWith("session.")
    if (isSessionEvent) sessionHooks.push(entry as SessionHookEntry)
  }

  return { toolHooks, sessionHooks }
}
