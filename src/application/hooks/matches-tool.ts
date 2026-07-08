import type { HookEntry } from "../../domain/types/hook-entry.ts"

export function matchesTool(entry: HookEntry & { tools?: string[] }, tool: string) {
  if (!entry.tools) return true

  return entry.tools.includes(tool)
}
