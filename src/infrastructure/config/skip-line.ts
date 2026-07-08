export function isSkipLine(line: string) {
  return line.trim() === "" || line.trimStart().startsWith("#")
}
