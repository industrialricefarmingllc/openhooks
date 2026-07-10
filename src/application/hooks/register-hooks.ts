import type { HooksConfig } from "../../domain/types/hooks-config.ts"
import { partitionEntries } from "./partition-entries.ts"
import { createToolHandler } from "./create-tool-handler.ts"
import { createSessionHandler } from "./create-session-handler.ts"

export function registerHooks(config: HooksConfig) {
  const partitioned = partitionEntries(config)
  const hooks: Record<string, Function> = {}

  for (const [event, entries] of Object.entries(partitioned.toolHooks)) {
    hooks[event] = createToolHandler(event, entries)
  }

  const hasSessionHooks = partitioned.sessionHooks.length > 0
  if (hasSessionHooks) {
    hooks.event = createSessionHandler(partitioned.sessionHooks)
  }

  return hooks
}
