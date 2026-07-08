import type { HooksConfig } from "../../domain/types/hooks-config.ts"
import type { HookEntry } from "../../domain/types/hook-entry.ts"
import type { SessionHookEntry } from "../../domain/types/session-hook-entry.ts"

export const partitionEntries = (config: HooksConfig) => {
  const toolHooks: Record<string, (HookEntry & { tools?: string[] })[]> = {}
  const sessionHooks: SessionHookEntry[] = []

  for (const entry of config.hooks) {
    if (entry.event.startsWith("tool.")) {
      if (!toolHooks[entry.event]) toolHooks[entry.event] = []

      toolHooks[entry.event]!.push(entry as HookEntry & { tools?: string[] })
    } else if (entry.event.startsWith("session.")) {
      sessionHooks.push(entry as SessionHookEntry)
    }
  }

  return { toolHooks, sessionHooks }
}
