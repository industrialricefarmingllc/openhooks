import type { HookEntry } from "../../domain/types/hook-entry.ts"

export const matchesTool = (entry: HookEntry & { tools?: string[] }, tool: string): boolean => {
  if (!entry.tools) return true

  return entry.tools.includes(tool)
}
