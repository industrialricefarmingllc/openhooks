export type BashAction = {
  bash: string
  timeout?: number
}

export type HookData = {
  id?: string
  event: string
  tools?: string[]
  actions: BashAction[]
}

export type Hook = HookData & {
  matchesTool(tool: string): boolean
  matchesEvent(eventType: string): boolean
  isToolHook(): boolean
  isSessionHook(): boolean
}

export type HookRegistry = {
  toolHooks: Map<string, Hook[]>
  sessionHooks: Hook[]
}
