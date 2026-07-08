export type EventType =
  | "tool.execute.before"
  | "tool.execute.after"

export type SessionEventType =
  | "session.created"
  | "session.deleted"
  | "session.idle"
  | "session.error"
