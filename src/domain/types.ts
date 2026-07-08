export type EventType =
  | "tool.execute.before"
  | "tool.execute.after"

export type SessionEventType =
  | "session.created"
  | "session.deleted"
  | "session.idle"
  | "session.error"

export type BashAction = {
  bash: string
  timeout?: number
}

export type HookEntry = {
  id?: string
  event: EventType
  tools?: string[]
  actions: BashAction[]
}

export type SessionHookEntry = {
  id?: string
  event: SessionEventType
  actions: BashAction[]
}

export type HooksConfig = {
  hooks: (HookEntry | SessionHookEntry)[]
}

export type ExecResult = {
  exitCode: number
  stdout: string
  stderr: string
}
