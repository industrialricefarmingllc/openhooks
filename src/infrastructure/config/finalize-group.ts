export const finalizeGroup = (current: Record<string, unknown> | null, hooks: unknown[]): void => {
  if (current) hooks.push(current)
}
