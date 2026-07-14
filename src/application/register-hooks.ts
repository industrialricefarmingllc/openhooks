import type { HookData } from "../domain/types/hook-types.ts"
import { createRegistry } from "../domain/hook/create-registry.ts"

export function registerHooks(entries: HookData[]) {
  return createRegistry(entries)
}
