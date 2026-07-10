import type { HookEntry } from "../../domain/types/hook-entry.ts"
import type { ToolInput } from "../types/tool-input.ts"
import type { ToolOutput } from "../types/tool-output.ts"
import { runActions } from "./run-actions.ts"

export function createToolHandler(event: string, entries: (HookEntry & { tools?: string[] })[]) {
  return async (input: ToolInput, output?: ToolOutput) => {
    for (const entry of entries) {
      const toolMismatch = entry.tools && !entry.tools.includes(input.tool)
      if (toolMismatch) continue

      if (output) {
        output.title = entry.id || event
      }

      runActions(entry.actions, output)
    }
  }
}
