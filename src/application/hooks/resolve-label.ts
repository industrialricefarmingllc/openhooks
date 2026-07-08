export function resolveLabel(entry: { id?: string }, fallback: string) {
  return entry.id || fallback
}
