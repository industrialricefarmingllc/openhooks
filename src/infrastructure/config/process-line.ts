import { isSkipLine } from "./skip-line.ts"
import { parseListLine } from "./parse-list-line.ts"
import { appendAction } from "./append-action.ts"
import { applyProperty } from "./apply-property.ts"

export const processLine = (
  raw: string,
  current: Record<string, unknown> | null,
  hooks: Record<string, unknown>[]
): Record<string, unknown> | null => {
  const line = raw.trimEnd()

  if (isSkipLine(line)) return current

  const parsed = parseListLine(line)

  if (parsed) {
    if (current) hooks.push(current)

    return { [parsed.key]: parsed.value }
  }

  if (!current) return current

  if (appendAction(current, line)) return current

  applyProperty(current, line)

  return current
}
