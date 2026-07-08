import type { SessionHookEntry } from "../../domain/types/session-hook-entry.ts"
import type { EventInput } from "../types/event-input.ts"
import { resolveLabel } from "./resolve-label.ts"
import { runActions } from "./run-actions.ts"

export function createSessionHandler(entries: SessionHookEntry[]) {
  return (input: EventInput) => entries.forEach(e => {
    if (input.event.type !== e.event && input.event.type !== e.event.replace("session.", "")) return
    try { runActions(e.actions, resolveLabel(e, e.event)) } catch {}
  })
}
