import type { SessionEventType } from "./event-types.ts"
import type { BashAction } from "./bash-action.ts"

export type SessionHookEntry = {
  id?: string
  event: SessionEventType
  actions: BashAction[]
}
