import { parsePropLine } from "./parse-prop-line.ts"
import { parseToolsList } from "./parse-tools-list.ts"

export function applyProperty(current: Record<string, unknown>, line: string) {
  const prop = parsePropLine(line)

  if (!prop) return

  const isToolsList = prop.key === "tools" && prop.value.startsWith("[")

  if (isToolsList) {
    current.tools = parseToolsList(prop.value)
    return
  }

  const isActionsKey = prop.key === "actions"

  if (isActionsKey) {
    const missingActions = !Array.isArray(current.actions)
    if (missingActions) current.actions = []
    return
  }

  current[prop.key] = prop.value
}
