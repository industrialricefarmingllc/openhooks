export function finalizeGroup(current: Record<string, unknown> | null, hooks: unknown[]) {
  if (current) hooks.push(current)
}
