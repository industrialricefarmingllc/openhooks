export const isSkipLine = (line: string): boolean => {
  return line.trim() === "" || line.trimStart().startsWith("#")
}
