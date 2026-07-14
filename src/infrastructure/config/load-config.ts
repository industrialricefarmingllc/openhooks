import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import type { HookData } from "../../domain/types/hook-types.ts"
import { getGlobalPath } from "./paths.ts"
import { parseYaml } from "./parser/parse-yaml.ts"

export function loadConfig(worktree: string) {
  const projectPath = join(worktree, ".opencode/hooks.yaml")
  const project = existsSync(projectPath) ? parseYaml(readFileSync(projectPath, "utf-8")) : []
  const globalPath = getGlobalPath()
  const global = existsSync(globalPath) ? parseYaml(readFileSync(globalPath, "utf-8")) : []
  const ids = new Set(project.map(h => h.id).filter(Boolean))
  return [...global.filter(h => !ids.has(h.id)), ...project]
}
