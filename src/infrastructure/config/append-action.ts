import type { BashAction } from "../../domain/types/bash-action.ts"
import { parseBashLine } from "./parse-bash-line.ts"

export const appendAction = (current: Record<string, unknown>, line: string): boolean => {
  const parsed = parseBashLine(line)

  if (!parsed) return false

  if (!Array.isArray(current.actions)) current.actions = []

  ;(current.actions as BashAction[]).push(parsed)

  return true
}
