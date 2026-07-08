import type { EventType } from "../../domain/types/event-types.ts"
import type { HookEntry } from "../../domain/types/hook-entry.ts"
import type { ToolInput } from "../types/tool-input.ts"
import type { ToolOutput } from "../types/tool-output.ts"
import { matchesTool } from "./matches-tool.ts"
import { resolveLabel } from "./resolve-label.ts"
import { runActions } from "./run-actions.ts"

export const createToolHandler = (
  event: string,
  entries: (HookEntry & { tools?: string[] })[]
) => {
  return async (input: ToolInput, output?: ToolOutput) => {
    for (const entry of entries) {
      if (!matchesTool(entry, input.tool)) continue

      if (output) {
        output.title = resolveLabel(entry, event as EventType)
      }

      runActions(entry.actions, resolveLabel(entry, event as EventType))
    }
  }
}
