export const parseBashLine = (line: string): { bash: string } | null => {
  const match = line.match(/^\s+- bash:\s*(.*)/)

  if (!match) return null

  return { bash: match[1]!.trim().replace(/^["']|["']$/g, "") }
}
