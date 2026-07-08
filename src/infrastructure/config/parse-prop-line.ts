export function parsePropLine(line: string) {
  const match = line.match(/^\s+(\w+):\s*(.*)/)

  if (!match) return null

  return { key: match[1]!, value: match[2]!.trim() }
}
