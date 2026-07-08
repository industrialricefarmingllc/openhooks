import type { SessionHookEntry } from "../../domain/types/session-hook-entry.ts"
import type { EventInput } from "../types/event-input.ts"
import { resolveLabel } from "./resolve-label.ts"
import { runActions } from "./run-actions.ts"

export const createSessionHandler = (entries: SessionHookEntry[]) => {
  return async (input: EventInput) => {
    const type = input.event.type

    for (const entry of entries) {
      const sessionEvent = entry.event.replace("session.", "")

      if (type !== sessionEvent && type !== entry.event) continue

      try {
        runActions(entry.actions, resolveLabel(entry, entry.event))
      } catch (e) {
        // ponytail: don't throw for session events, just log
        console.error(`openhooks: session hook failed: ${e}`)
      }
    }
  }
}
