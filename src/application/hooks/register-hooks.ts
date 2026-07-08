import type { HooksConfig } from "../../domain/types/hooks-config.ts"
import { partitionEntries } from "./partition-entries.ts"
import { createToolHandler } from "./create-tool-handler.ts"
import { createSessionHandler } from "./create-session-handler.ts"

export const registerHooks = (config: HooksConfig): Record<string, Function> => {
  const partitioned = partitionEntries(config)
  const hooks: Record<string, Function> = {}

  for (const [event, entries] of Object.entries(partitioned.toolHooks)) {
    hooks[event] = createToolHandler(event, entries)
  }

  if (partitioned.sessionHooks.length > 0) {
    hooks.event = createSessionHandler(partitioned.sessionHooks)
  }

  return hooks
}
