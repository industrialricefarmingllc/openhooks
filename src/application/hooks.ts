import type { HooksConfig, HookEntry, SessionHookEntry, ExecResult } from "../domain/types.ts"
import { exec } from "../infrastructure/executor.ts"

type ToolInput = {
  tool: string
  sessionID: string
  callID: string
  args?: Record<string, unknown>
}

type ToolOutput = {
  title?: string
  output?: string
  metadata?: Record<string, unknown>
}

type EventInput = {
  event: { type: string; properties?: Record<string, unknown> }
}

const runActions = (actions: { bash: string }[], label: string): void => {
  for (const action of actions) {
    const result: ExecResult = exec(action.bash)
    if (result.exitCode === 0) continue
    throw new Error(`openhooks: ${label} failed (exit ${result.exitCode})\n${result.stderr || result.stdout}`)
  }
}

export const registerHooks = (config: HooksConfig) => {
  const toolHooks: Record<string, (HookEntry & { tools?: string[] })[]> = {}
  const sessionHooks: SessionHookEntry[] = []

  for (const entry of config.hooks) {
    if ("tools" in entry) {
      if (!toolHooks[entry.event]) toolHooks[entry.event] = []
      toolHooks[entry.event]!.push(entry as HookEntry & { tools?: string[] })
    } else if (entry.event.startsWith("session.")) {
      sessionHooks.push(entry as SessionHookEntry)
    }
  }

  const hooks: Record<string, (input: ToolInput | EventInput, output?: ToolOutput) => Promise<void>> = {}

  for (const [event, entries] of Object.entries(toolHooks)) {
    if (event === "tool.execute.before" || event === "tool.execute.after") {
      hooks[event] = async (input: ToolInput, output?: ToolOutput) => {
        const toolInput = input as ToolInput

        for (const entry of entries) {
          if (entry.tools && !entry.tools.includes(toolInput.tool)) continue

          if (output) {
            output.title = entry.id || event
          }

          runActions(entry.actions, entry.id || event)
        }
      }
    }
  }

  if (sessionHooks.length > 0) {
    hooks.event = async (input: EventInput) => {
      const type = input.event.type

      for (const entry of sessionHooks) {
        const sessionEvent = entry.event.replace("session.", "")
        if (type !== sessionEvent && type !== entry.event) continue

        try {
          runActions(entry.actions, entry.id || entry.event)
        } catch (e) {
          // ponytail: don't throw for session events, just log
          console.error(`openhooks: session hook failed: ${e}`)
        }
      }
    }
  }

  return hooks
}
