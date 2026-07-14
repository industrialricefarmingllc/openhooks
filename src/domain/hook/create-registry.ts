import type { HookData, Hook } from "../types/hook-types.ts"
import { createHook } from "./create-hook.ts"

export function createRegistry(entries: HookData[]) {
  const toolHooks = new Map<string, Hook[]>()
  const sessionHooks: Hook[] = []
  for (const data of entries) {
    const hook = createHook(data) as Hook
    if (hook.isToolHook()) toolHooks.set(hook.event, [...(toolHooks.get(hook.event) || []), hook])
    else if (hook.isSessionHook()) sessionHooks.push(hook)
  }
  return { toolHooks, sessionHooks }
}
