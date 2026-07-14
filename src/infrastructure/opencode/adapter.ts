import type { HookRegistry } from "../../domain/types/hook-types.ts"
import type { ActionRunner } from "../../domain/types/ports.ts"
import type { ToolInput, EventInput } from "./types/index.ts"
import { runToolActions } from "../../domain/hook/run-tool-actions.ts"
import { runSessionActions } from "../../domain/hook/run-session-actions.ts"

export function adaptHandlers(registry: HookRegistry, runner: ActionRunner) {
  const handlers: Record<string, Function> = {}

  for (const [event, hooks] of registry.toolHooks) {
    handlers[event] = async (input: ToolInput, output?: { title?: string; output?: string }) => {
      for (const hook of hooks) {
        if (!hook.matchesTool(input.tool)) continue
        runToolActions(hook, runner, output)
        if (output) output.title = hook.id || event
      }
    }
  }

  if (registry.sessionHooks.length > 0) {
    handlers.event = async (input: EventInput) => {
      for (const hook of registry.sessionHooks) {
        if (hook.matchesEvent(input.event.type)) runSessionActions(hook, runner)
      }
    }
  }

  return handlers
}
