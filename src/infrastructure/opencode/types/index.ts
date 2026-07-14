export type ToolInput = {
  tool: string
  sessionID: string
  callID: string
  args?: Record<string, unknown>
}

export type ToolOutput = {
  title?: string
  output?: string
  metadata?: Record<string, unknown>
}

export type EventInput = {
  event: { type: string; properties?: Record<string, unknown> }
}
