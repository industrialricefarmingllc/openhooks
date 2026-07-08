export function parseToolsList(val: string) {
  return val.slice(1, -1).split(",").map(s => s.trim().replace(/['"]/g, ""))
}
