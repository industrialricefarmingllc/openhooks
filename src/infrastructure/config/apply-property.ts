import { parsePropLine } from "./parse-prop-line.ts"
import { parseToolsList } from "./parse-tools-list.ts"

export const applyProperty = (current: Record<string, unknown>, line: string): void => {
  const prop = parsePropLine(line)

  if (!prop) return

  if (prop.key === "tools" && prop.value.startsWith("[")) {
    current.tools = parseToolsList(prop.value)
  } else if (prop.key === "actions") {
    if (!Array.isArray(current.actions)) current.actions = []
  } else {
    current[prop.key] = prop.value
  }
}
