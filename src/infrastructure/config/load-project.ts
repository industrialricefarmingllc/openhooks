import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import type { HookEntry } from "../../domain/types/hook-entry.ts"
import type { SessionHookEntry } from "../../domain/types/session-hook-entry.ts"
import { getProjectPath } from "./paths.ts"
import { parseYaml } from "./parse-yaml.ts"

export function loadProject(worktree: string) {
  const projectPath = join(worktree, getProjectPath())

  if (!existsSync(projectPath)) return []

  const parsed = parseYaml(readFileSync(projectPath, "utf-8"))

  return parsed.hooks
}
