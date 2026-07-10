import type { HooksConfig } from "../../domain/types/hooks-config.ts"
import type { HookEntry } from "../../domain/types/hook-entry.ts"
import type { SessionHookEntry } from "../../domain/types/session-hook-entry.ts"
import { processLine } from "./process-line.ts"

export function parseYaml(text: string) {
  const hooks: (HookEntry | SessionHookEntry)[] = []
  let current: Record<string, unknown> | null = null

  for (const raw of text.split("\n")) {
    current = processLine(raw, current, hooks)
  }

  if (current) hooks.push(current)

  return { hooks }
}
