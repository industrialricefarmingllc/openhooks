export type ToolInput = {
  tool: string
  sessionID: string
  callID: string
  args?: Record<string, unknown>
}
