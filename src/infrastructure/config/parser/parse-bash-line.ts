export function parseBashLine(line: string) {
  const match = line.match(/^\s+- bash:\s*(.*)/)

  if (!match) return null

  return { bash: match[1]!.trim().replace(/^["']|["']$/g, "") }
}
