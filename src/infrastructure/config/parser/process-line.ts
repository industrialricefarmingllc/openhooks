import { parseListLine } from "./parse-list-line.ts"
import { appendAction } from "./append-action.ts"
import { applyProperty } from "./apply-property.ts"

export function processLine(raw: string, current: Record<string, unknown> | null, hooks: Record<string, unknown>[]) {
  const line = raw.trimEnd()
  if (!line.trim() || line.trimStart().startsWith("#")) return current
  const parsed = parseListLine(line)
  if (parsed) { current && hooks.push(current); return { [parsed.key]: parsed.value } }
  if (!current) return current
  if (appendAction(current, line)) return current
  applyProperty(current, line)
  return current
}
