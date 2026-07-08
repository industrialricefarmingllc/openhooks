export const parseToolsList = (val: string): string[] => {
  return val.slice(1, -1).split(",").map(s => s.trim().replace(/['"]/g, ""))
}
