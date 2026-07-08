export const parseListLine = (line: string): { key: string; value: string } | null => {
  const match = line.match(/^  - (\w+):\s*(.*)/)

  if (!match) return null

  return { key: match[1]!, value: match[2]!.trim() }
}
