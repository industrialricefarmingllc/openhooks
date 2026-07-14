import type { HookData } from "../../../domain/types/hook-types.ts"
import { processLine } from "./process-line.ts"

export function parseYaml(text: string) {
  const hooks: Record<string, unknown>[] = []
  let current: Record<string, unknown> | null = null
  for (const raw of text.split("\n")) {
    current = processLine(raw, current, hooks)
  }
  if (current) hooks.push(current)
  return hooks as HookData[]
}
