import type { HooksConfig } from "../../domain/types/hooks-config.ts"
import { loadGlobal } from "./load-global.ts"
import { loadProject } from "./load-project.ts"
import { mergeHooks } from "./merge-by-id.ts"

export function loadConfig(worktree: string) {
  const global = loadGlobal()
  const project = loadProject(worktree)
  const merged = mergeHooks(global, project)

  return { hooks: merged }
}
