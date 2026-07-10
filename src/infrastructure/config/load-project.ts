import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { parseYaml } from "./parse-yaml.ts"

export function loadProject(worktree: string) {
  const projectPath = join(worktree, ".opencode/hooks.yaml")
  const hasProjectConfig = existsSync(projectPath)

  if (!hasProjectConfig) return []

  const parsed = parseYaml(readFileSync(projectPath, "utf-8"))

  return parsed.hooks
}
