import { existsSync, readFileSync } from "node:fs"
import type { HookEntry } from "../../domain/types/hook-entry.ts"
import type { SessionHookEntry } from "../../domain/types/session-hook-entry.ts"
import { getGlobalPath } from "./paths.ts"
import { parseYaml } from "./parse-yaml.ts"

export function loadGlobal() {
  if (!existsSync(getGlobalPath())) return []

  const parsed = parseYaml(readFileSync(getGlobalPath(), "utf-8"))

  return parsed.hooks
}
