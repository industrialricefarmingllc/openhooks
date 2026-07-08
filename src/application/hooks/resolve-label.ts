export const resolveLabel = (entry: { id?: string }, fallback: string): string => {
  return entry.id || fallback
}
