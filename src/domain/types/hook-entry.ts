import type { EventType } from "./event-types.ts"
import type { BashAction } from "./bash-action.ts"

export type HookEntry = {
  id?: string
  event: EventType
  tools?: string[]
  actions: BashAction[]
}
