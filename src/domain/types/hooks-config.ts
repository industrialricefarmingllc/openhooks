import type { HookEntry } from "./hook-entry.ts"
import type { SessionHookEntry } from "./session-hook-entry.ts"

export type HooksConfig = {
  hooks: (HookEntry | SessionHookEntry)[]
}
