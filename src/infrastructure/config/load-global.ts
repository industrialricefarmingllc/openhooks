import { existsSync, readFileSync } from "node:fs"
import type { HookEntry } from "../../domain/types/hook-entry.ts"
import type { SessionHookEntry } from "../../domain/types/session-hook-entry.ts"
import { GLOBAL_PATH } from "./paths.ts"
import { parseYaml } from "./parse-yaml.ts"

export const loadGlobal = (): (HookEntry | SessionHookEntry)[] => {
  if (!existsSync(GLOBAL_PATH)) return []

  const parsed = parseYaml(readFileSync(GLOBAL_PATH, "utf-8"))

  return parsed.hooks
}
